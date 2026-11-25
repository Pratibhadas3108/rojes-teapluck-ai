#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-9222}"

if ! lsof -i :"$PORT" >/dev/null 2>&1; then
  echo "Starting Google Chrome with remote debugging on port $PORT..."
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --remote-debugging-port="$PORT" \
    --user-data-dir="$HOME/.chrome-gemini-pro-profile" \
    "https://gemini.google.com/app" >/dev/null 2>&1 &
  sleep 4
fi

echo "Running Gemini Pro 16:9 infographic generation bot..."
node scripts/chrome_gemini_bot.js --port="$PORT" --force

echo "Re-embedding generated 16:9 infographics into Proposal & Proof of Work PDFs..."
python3 scripts/generate_pdfs.py

echo "Done! All images and PDFs updated."
