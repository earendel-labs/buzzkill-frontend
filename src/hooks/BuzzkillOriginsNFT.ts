/* ──────────────────────────────────────────────────────────────── */
/*  src/hooks/BuzzkillOriginsNFT.ts                                */
/* ──────────────────────────────────────────────────────────────── */
import type { Abi, Address } from "abitype";
import { useReadContract, useReadContracts, usePublicClient } from "wagmi";
import { useEffect, useState, useMemo } from "react";
import abiJson from "@/app/libs/abi/BuzzkillOriginsNFT.json";

/* ------------- constants ------------- */
const envAddress = process.env.NEXT_PUBLIC_BUZZKILL_ORIGINS_ADDRESS;
if (!envAddress || !envAddress.startsWith("0x"))
  throw new Error("Missing/invalid NEXT_PUBLIC_BUZZKILL_ORIGINS_ADDRESS");

export const BUZZKILL_ORIGINS_NFT_ADDRESS = envAddress as Address;
export const BUZZKILL_ORIGINS_NFT_ABI = abiJson as Abi;

/* ------------- helpers ------------- */
type ReadOpts = { watch?: boolean };

function mergeQuery(
  base: Record<string, unknown> | undefined,
  watch: boolean | undefined
) {
  return watch === false
    ? { ...(base ?? {}), refetchInterval: false as const }
    : base;
}

function hasMulticall(client: ReturnType<typeof usePublicClient>) {
  const addr = client?.chain?.contracts?.multicall3?.address;
  return typeof addr === "string" && addr.startsWith("0x");
}

/* ------------- single reads ------------- */
export function useOriginsBalanceOf(owner: Address, opts: ReadOpts = {}) {
  return useReadContract({
    address: BUZZKILL_ORIGINS_NFT_ADDRESS,
    abi: BUZZKILL_ORIGINS_NFT_ABI,
    functionName: "balanceOf",
    args: [owner],
    query: mergeQuery(undefined, opts.watch),
  });
}

export function useOriginsTokenURI(tokenId?: number, opts: ReadOpts = {}) {
  const enabled = tokenId !== undefined;
  return useReadContract({
    address: BUZZKILL_ORIGINS_NFT_ADDRESS,
    abi: BUZZKILL_ORIGINS_NFT_ABI,
    functionName: "tokenURI",
    args: enabled ? [BigInt(tokenId)] : undefined,
    query: mergeQuery({ enabled }, opts.watch),
  });
}

/* ------------- main hook ------------- */
export function useOwnedOriginsTokens(
  owner: Address,
  maxSupply: number,
  opts: ReadOpts = {}
) {
  const balanceQuery = useOriginsBalanceOf(owner, opts);
  const balance = Number(balanceQuery.data ?? 0);

  const [owned, setOwned] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState(false);
  const client = usePublicClient();

  useEffect(() => {
    if (!client || balance === 0) {
      setOwned([]);
      return;
    }

    let cancelled = false;
    setLoadingIds(true);

    /* helper to read ownerOf for a list of ids in parallel */
    const readOwnerChunk = async (ids: number[]) =>
      Promise.all(
        ids.map(async (id) => {
          try {
            const addr = (await client.readContract({
              address: BUZZKILL_ORIGINS_NFT_ADDRESS,
              abi: BUZZKILL_ORIGINS_NFT_ABI,
              functionName: "ownerOf",
              args: [BigInt(id)],
            })) as Address;
            return addr.toLowerCase() === owner.toLowerCase() ? id : null;
          } catch {
            return null;
          }
        })
      ).then((arr) => arr.filter((n): n is number => n !== null));

    const fetchIds = async () => {
      /* ---------- Fast path: enumerable + multicall available ---------- */
      if (hasMulticall(client)) {
        try {
          const calls = Array.from({ length: balance }, (_, i) => ({
            address: BUZZKILL_ORIGINS_NFT_ADDRESS,
            abi: BUZZKILL_ORIGINS_NFT_ABI,
            functionName: "tokenOfOwnerByIndex" as const,
            args: [owner, BigInt(i)],
          }));

          const res = (await client.multicall({
            contracts: calls,
            allowFailure: false,
          })) as Array<{ result: bigint }>;

          const ids = res.map((r) => Number(r.result));
          if (!cancelled) setOwned(ids);
          return;
        } catch {
          /* fall through to brute force */
        }
      }

      /* ---------- Fallback: chunked ownerOf scan ---------- */
      const BATCH = 50;
      const tmp: number[] = [];

      for (let start = 0; start < maxSupply; start += BATCH) {
        const slice = [...Array(BATCH).keys()].map((i) => start + i);
        const hits = await readOwnerChunk(slice);
        tmp.push(...hits);
        if (tmp.length >= balance) break;
      }

      if (!cancelled) setOwned(tmp);
    };

    fetchIds().finally(() => !cancelled && setLoadingIds(false));
    return () => {
      cancelled = true;
    };
  }, [balance, owner, maxSupply, client]);

  const ownersQuery = useMemo(
    () => ({ isLoading: loadingIds, data: owned }),
    [loadingIds, owned]
  );

  return { balanceQuery, ownersQuery, owned };
}

/* ------------- batch tokenURI ------------- */
export function useOriginsTokenURIsBatch(
  tokenIds: number[],
  opts: ReadOpts = {}
) {
  const calls = useMemo(() => {
    if (!tokenIds.length) return [];
    return tokenIds.map((id) => ({
      address: BUZZKILL_ORIGINS_NFT_ADDRESS,
      abi: BUZZKILL_ORIGINS_NFT_ABI,
      functionName: "tokenURI" as const,
      args: [BigInt(id)],
    }));
  }, [tokenIds]);

  return useReadContracts({
    contracts: calls,
    query: mergeQuery({ enabled: tokenIds.length > 0 }, opts.watch),
  });
}
