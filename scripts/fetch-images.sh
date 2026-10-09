#!/bin/bash
# Fetch Guidr photography — sequential, stdout-captured (the -o flag is broken in this SDK version)
OUT=/home/z/my-project/scripts/img-json
mkdir -p "$OUT"

declare -A QUERIES=(
  [hero-dunes]="warm sunrise light over the big red sand dunes of the Namib desert in Namibia"
  [quad-biking]="person riding a quad bike on a sand dune in the Namib desert near Swakopmund Namibia"
  [sandboarding]="sandboarding down a tall sand dune in Namibia"
  [catamaran]="dolphins and seals swimming alongside a catamaran cruise in Walvis Bay Namibia"
  [kayaking]="kayaking with cape fur seals at Pelican Point Walvis Bay Namibia"
  [flamingos]="flamingos feeding in the Walvis Bay lagoon at sunset Namibia"
  [balloon]="hot air balloon floating over Sossusvlei dunes at sunrise Namibia"
  [deadvlei]="dead camelthorn trees on the white clay pan of Deadvlei with red dunes behind Namibia"
  [dune45]="climbers walking up the ridge of Dune 45 at sunrise Sossusvlei Namibia"
  [etosha]="elephants drinking at a waterhole in Etosha National Park Namibia"
  [desert-elephant]="desert adapted elephant walking in rocky Damaraland Namibia"
  [fishriver]="wide panorama of Fish River Canyon in Namibia with layered rock"
  [spitzkoppe-night]="Milky Way night sky above the Spitzkoppe granite peaks Namibia"
  [rock-art]="ancient rock engravings petroglyphs at Twyfelfontein Namibia"
  [kolmanskop]="abandoned buildings filled with sand in Kolmanskop ghost town Namibia"
  [swakopmund]="Swakopmund coastline with the jetty and Atlantic ocean Namibia"
  [sesriem]="narrow rock walls of Sesriem Canyon Namibia"
  [desert-walk]="small guided tour group walking across golden desert sand in Namibia"
  [guide-portrait]="smiling African safari guide portrait outdoors in warm light"
  [living-desert]="small desert creature like a gecko or chameleon on sand in the Namib desert Namibia"
  [scenic-flight]="small cessna aircraft scenic flight over the Atlantic coast and dunes of Namibia"
)

for key in hero-dunes quad-biking sandboarding catamaran kayaking flamingos balloon deadvlei dune45 etosha desert-elephant fishriver spitzkoppe-night rock-art kolmanskop swakopmund sesriem desert-walk guide-portrait living-desert scenic-flight; do
  if [ -s "$OUT/$key.json" ]; then
    echo "SKIP $key"
    continue
  fi
  q="${QUERIES[$key]}"
  echo "FETCH $key ..."
  for attempt in 1 2 3; do
    timeout 120 z-ai image-search -q "$q" -c 4 --gl us --no-rank > "$OUT/$key.raw" 2>&1
    # Extract JSON part (starts at the first line beginning with '{')
    awk '/^\{/{found=1} found{print}' "$OUT/$key.raw" > "$OUT/$key.json"
    if [ -s "$OUT/$key.json" ] && python3 -c "import json,sys; d=json.load(open('$OUT/$key.json')); sys.exit(0 if d.get('success') and d.get('results') else 1)" 2>/dev/null; then
      echo "  OK"
      break
    fi
    echo "  attempt $attempt failed, retrying"
    sleep $((attempt * 15))
  done
  sleep 5
done

echo "DONE" > "$OUT/_status.txt"
