// Single source of truth for the winsmux version shown on the site.
// Resolved at build time from the latest GitHub release of Sora-bluesky/winsmux.

const FALLBACK_VERSION = 'v0.36.28';

async function fetchLatestVersion(): Promise<string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'winsmux.dev-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    'https://api.github.com/repos/Sora-bluesky/winsmux/releases/latest',
    { headers },
  );
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { tag_name?: string };
  if (!data.tag_name || !/^v\d+\.\d+\.\d+/.test(data.tag_name)) {
    throw new Error(`unexpected tag_name: ${JSON.stringify(data.tag_name)}`);
  }
  return data.tag_name;
}

let resolved: string;
try {
  resolved = await fetchLatestVersion();
} catch (err) {
  // In CI a stale version must never deploy silently — fail the build.
  if (process.env.CI) {
    throw new Error(`failed to resolve winsmux version in CI: ${err}`);
  }
  console.warn(`[version] falling back to ${FALLBACK_VERSION}: ${err}`);
  resolved = FALLBACK_VERSION;
}

export const version = resolved;
