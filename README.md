# Nomad Horizon

A mobile-first space trucker game that runs in the browser. Haul freight between space stations and frontier towns, fly seamlessly from orbit down to procedurally generated planets, and warp across an endless galaxy.

Planets, terrain, skies, wildlife, star systems and towns are generated in code at runtime with [three.js](https://threejs.org/) r128. The ships and the space station are hand-made 3D models (see [3D models](#3d-models)); if a model ever fails to load, the game falls back to a procedural version so it always runs.

## Play

Open `index.html` in a modern browser, or host the repo with any static host (GitHub Pages, Netlify, Vercel). It works best on a phone in landscape.

### Install on your phone

Nomad Horizon is a Progressive Web App. Once it's hosted over HTTPS:

- **Android (Chrome):** tap **INSTALL APP** on the title screen, or use the browser menu's *Install app*.
- **iPhone / iPad (Safari):** tap **Share**, then **Add to Home Screen**.

The installed app opens full screen in landscape and works offline after the first launch. When releasing a new version, bump `VERSION` in `sw.js` so installed copies refresh their cache.

**Flying**

| Action | Touch | Keyboard / mouse |
| --- | --- | --- |
| Steer (turn rate) | Left thumbstick (pitch inverted by default; PITCH button toggles) | Arrow keys, A / D |
| Set speed (stays set, includes reverse) | Throttle lever | W / S |
| Boost | BOOST button | Space or Shift |
| Look around the ship | Drag anywhere (eases back on release) | Drag with the mouse |
| Dock, land, board | On-screen prompt | E |

**On foot**

| Action | Touch | Keyboard / mouse |
| --- | --- | --- |
| Move | Left thumbstick | WASD |
| Look | Drag anywhere | Drag with the mouse |
| Jetpack | JET button | Space or Shift |
| Scan | SCAN button | F |
| Terminal, board ship | On-screen prompt | E |
| Planet map | Tap the radar | M |
| My towns | Town button by the radar | T |

Each freighter hull has its own turn rate and weight: the Skiff snaps into turns, the Atlas swings wide and coasts out of them.

## Features

### The job
- **Freight contracts:** take standard, fragile, perishable and hazardous loads between the station and towns in each system; your hold has limited crate slots.
- **Delivery routes:** tap a cargo line under your status panel (or any destination in System Nav or the planet map) and the autopilot chains every leg: warp if it's in another system, pulse across, drop into the atmosphere, cruise to the town and land on its pad, or fly in and dock at the station. Raiders and patrols pause the route and hand you control; it resumes once things are quiet. Touching the stick cancels it.
- **Local or warp at a glance:** jobs in the system you're in show in amber and jobs that need a warp show in blue, on the HUD cargo list and on every contract board. The HUD lists in-system drops first, then warp drops grouped by system, and boards tag warp jobs headed to a system you're already carrying freight to (**ON YOUR … RUN**), so you can stack a trip instead of zig-zagging.
- **Project town:** pick one town as your project from its Town tab. Every board in its system keeps a slot for loads going there (two at the station): construction while it grows, its businesses' wants once they're open, at standard rates. They're marked ★ in gold and pinned to the top of each board. A ★ line on the HUD shows the project's stage and progress; tap it to fly to the nearest board with a project load (or to warp to the project's system if you're elsewhere). Each time your project reaches a new stage you get a card with what it unlocked and what you put in (crates hauled, units invested, fleet growth), a CB shout-out, and the choice to keep building or pick a new project.
- **Fresh boards:** every board posts a new set of contracts every 15 minutes (real time, so they also turn over while the game is closed), or as soon as you've taken everything on it. The board header shows when the next set arrives.
- **Tidy HUD:** the cargo list under your status panel has a header line with your crates and drops; tap it to fold the list away (it remembers).
- **My towns:** the town button by the radar (or T) opens an overview of every town and outpost in the system you're in, or every town you've had a hand in across the galaxy, grouped by system. Each shows its stage and progress, what the next stage takes (in crates, construction loads or units invested), its businesses and free plots, your stake and what it pays, your fleet's contribution and, for your project, how many stops have ★ loads for it. Set or stop your project, or route straight there (warp included), from the list.

### Your home
- **Build it in your project town:** the Town tab of your project town offers a **PREFAB CABIN** (25,000 units). It goes up on its own lot just outside the town, clear of the city rings, on the flattest dry spot round it; a slab and a ramp keep it level on any slope. One home in the galaxy: sell it (for half of what you put in) from its terminal to build somewhere else.
- **Upgrade it:** **FRONTIER HOUSE** (75,000: two storeys and a workshop) and **HILLTOP ESTATE** (200,000: a big house with a glass lounge, a hangar and a mast). Each tier is bigger in the world.
- **What it does for you:** sleep and eat at home for free (sleeping at home keeps you well rested for longer); a **private pad** the autopilot lands on (⌂ HOME on the planet map, or ROUTE HOME in My Towns, from anywhere in the galaxy); a **garage** out back where your spare rigs park (1, 2 or 4 bays) and where you can swap which one you fly while parked on your pad; and a **workshop** (half-price fuel and repairs in a House, free in an Estate).
- **Home terminal:** by the front door. HOME shows your tier, perks, an upgrade, your record on the wall and the sell option; GARAGE lists your rigs; SERVICES is your kitchen, bed and workshop.
- **Walk inside:** **GO INSIDE** at the front door. A cabin is one room (bunk, kitchenette, table, terminal desk); a house adds a bedroom and a workshop; an estate is a big hall with a kitchen island, dining table and sofas, a bedroom, a workshop, a **trophy room** (your record on the wall and your rigs in miniature on a shelf) and a **glass lounge** looking out over the land. Walk up to the bed to sleep, the kitchen to eat (and restock your ration packs), the desk to use the home terminal or the workbench for fuel and repairs. Walls and furniture block you, the windows show day or night, and the world outside goes quiet.
- **Customs on the route:** in a customs system you haven't checked into, the route flies you through the customs hall first, rolls you onto the scale, and carries on to the drop once you're cleared. Carrying contraband? It asks first: skip the hall and go straight to the drop, or take your chances with the scanner. Wanted pilots are never routed into the hall.
- **Pilot needs:** your pilot gets hungry and tired while you play (never while the game is closed). Eat a hot meal at a diner or cantina, carry ration packs (tap the fork on the HUD), and sleep at a motel, a station bunk or in your cab when landed. Sleeping jumps the clock 8 hours, so perishable deadlines keep running. Running on empty slows energy and scans; exhaustion dims the screen, dulls handling and causes microsleeps, and customs fines you for flying over your hours. Galley and sleeper cab modules help on long hauls, fleet pilots take rest breaks, and a relaxed mode in Services turns it all off.

- **Growing towns:** every crate you deliver to a town or outpost grows it, and **construction** loads (prefab habitats, girders, power cells and more) count triple. Outposts grow into settlements, settlements into towns, towns into cities. A town gets a new district ring of housing and industry blocks with a ring road and traffic; a city adds an outer ring of taller blocks. Bigger towns post more contracts and pay more for deliveries (+8% per stage), and growing towns post more construction loads. The **Town** tab at any town terminal shows its stage and progress. Towns grow in place while you're there.
- **Business districts:** each ring has plots you fill yourself from the Town tab (3,000 units each): a mining depot, farm co-op, clinic, shipyard or market & cantina, one of each per town, 2 plots in a town and 5 in a city. Each business ships its own goods out of town and pulls in the goods it needs from boards across the system: those loads are marked for the business, pay +35% and count double toward the town's growth.
- **Investing in towns:** the Town tab sells shares in 1,000, 5,000 and 20,000 unit lots. Every 150 units invested adds 1 growth, so you can buy a town up to its next stage without hauling every crate. Your stake pays an hourly income of 2% (outpost), 4% (settlement), 6% (town) or 8% (city), +15% for each business. It goes into your company account if you've founded one, otherwise straight to you, and keeps paying at half rate for up to 8 hours while the game is closed. Your stake and its earnings show on the Town tab, and every town you hold shares in is listed there and on the station's Fleet tab.

### Your rigs
- **Freighter progression:** start in the Skiff light courier (4 crates) and trade up through the Mule short-hauler (6), Longhaul tractor-trailer (9) and Atlas heavy lifter (12) at any station. Each hull handles heavier than the last: the Skiff snaps into turns, the Atlas swings wide and coasts out of them. Once you own more than one, the Upgrades tab has a hangar where you can switch between them.
- **The Rook Twin-Boom:** a patched-up smuggler's freighter, sold as a special order in the Upgrades tab (cheaper in lawless systems). 8 crates, 2 module slots, a built-in smuggler's compartment and the fastest handling in the game, but thin plating that takes 60% more damage. No oversize loads.
- **Cargo modules and licences:** fit a reefer bay (perishables), shock racks (fragile cargo takes less damage), a shielded vault (hazardous, with a hazmat licence) or an aux fuel tank. Bigger hulls have more module slots. An oversize permit unlocks 3–4 crate loads on Longhaul and Atlas hulls.
- **Fuel and wear:** warps burn fuel (longer jumps and bigger hulls burn more). Bumps, atmosphere entries and jumps wear the hull, and a hull under 50% flies slower. Refuel and repair at any terminal; fuel depots sell the cheapest fuel.

### Flying and getting around
- **Seamless flight:** fly from space through the atmosphere to the ground and back with no loading screens.
- **Wide systems and massive worlds:** planets sit 15–30K km apart and are huge next to your rig (a planet is well over 100 Atlas lengths across), so a planet-to-planet hop takes about 1–2 minutes.
- **Pulse drive:** tap **PULSE** (above the throttle, or P) in open space. It's mass-locked near planets, the station and hostiles, burns a little fuel, and drops you out automatically on arrival. Raiders can interdict you mid-pulse.
- **Autopilot everywhere:** tap the radar (or N) for **System Nav** and pick a planet or the station. The autopilot turns, pulses, drops out about 1,000 km short and runs the rest at full throttle (no boost), then lines you up over your delivery town or docks you at the station. It steers wide of planets, the station's wheel and the customs hall. In an atmosphere, tap the radar for the planet map and pick a town or outpost: it cruises there, keeps clear of the terrain and lands on the pad. **Back to orbit** climbs you straight out to space. Any stick input takes back control.
- **Procedural galaxy:** warp to seeded star systems with their own star, nebula and planet types (lush, ocean, desert, frozen, scorched, toxic, exotic).

### The station and customs
- **Orbital station:** a 160 m hub tower with a 260 m habitat wheel spinning round its neck, towering over the freight pier bolted to its face. You can't fly through the hub.
- **Freight pier:** four berths built from loading-dock modules, each with robot clamp arms that swing back for arrivals and reach in to grip your hull once you're docked. Cargo lifts, an overhead container rail, crew on the concourse, flood lights, a live departures board, and other traffic docking and leaving berth 4. Your fleet's ships berth here too.
- **Customs hall:** in every system with customs, a drive-through hall sits straight ahead of the warp-in point. Fly in, stop on the scale under the scanner arch for the scan, and leave out the back (or dock at the station) to check in; legal cargo can't be signed for until you do.

### Law and danger
- **Contraband:** settlements post contraband runs (grey goods, restricted, black-market) that pay 1.8–4× but get scanned at customs: comply, try a bribe, or run. A smuggler's compartment helps hide it.
- **Patrols and heat:** patrol cutters hail ships that skipped customs or are wanted, and do random inspections. Run and you're wanted in that system: lose them by outrunning them, diving into an atmosphere or warping out. Heat cools over time or can be paid off at a station.
- **Security levels and pirates:** each system is High, Medium, Low or Lawless security (shown in the warp menu). The lower the security, the fewer patrols, the more raiders and the better black-market pay. Raiders demand a ransom or a crate; run for the station defence grid, an atmosphere or a warp. A deflector shield and decoy flares help. You never lose your ship for good.

### Your company
- **Trucking company:** register your own company at any station, buy freighters, hire rookie, veteran or ace pilots and send ships on local runs or long hauls. They earn into the company account in real time, and at half rate for up to 8 hours while the game is closed. Collect earnings, repair worn ships and expand your head office from the station's Fleet tab. Fleet ships berth at the station pier and show on the departures board.
- **Fleet runs grow towns:** every finished run drops at a town in the system you're in (long hauls sometimes cross to a neighbouring system), and about half of them add growth there (a quarter while you're away): 1 point, doubled for Longhaul and Atlas hulls and doubled again on long hauls. Each ship shows its last drop, the Town tab shows how much growth your company has brought, and a town your fleet levels up goes in the company log.
- **See your fleet at work:** when you're on a planet, your crews favour its towns, and a drop there flies in for real: the rig comes in over the town, sets down on the pad, unloads for a while and leaves. If your own rig is on that pad it makes a low pass instead, and it lifts off early if you're coming in to land. Your pilots check in on channel 19 under their own call signs: drops, rest breaks, worn hulls, a wave from the pad.

### Worlds
- **Open planet surfaces:** each planet is about 3 × 3 km, streamed in tiles as you fly (full detail nearby, simpler tiles further out). Where you dive in from orbit decides where you arrive.
- **Settlements:** 1–2 habitable planets per system, each with 2–4 towns (landing pad, cargo terminal, residents); every other planet has 1–2 outposts (mining camps, research outposts, fuel depots). Short-hop contracts run between towns on the same planet.
- **Planet map:** tap the radar (or press M) for a relief map with every town and outpost, your drops, your ship and a waypoint you can set.
- **Living worlds:** day/night cycle, wildlife that grazes and flees, crystal deposits to mine and sell.

### Atmosphere
- **CB radio:** other drivers chatter on channel 19: patrol and raider warnings for the system you're in, which station is paying top units, town gossip, and the odd word when you set out or arrive. Toggle it with the CB button.
- **Sound:** a cockpit drone, station ambience, warehouse room tone and forklifts at the loading docks, town-square bustle, night crickets and gravel footsteps on foot, landing gear, warp spool-ups, whooshes, landing burns, re-entry roar and hatch sounds from recorded clips, plus an engine, wind and jetpack that follow your throttle and speed, and interface, customs, patrol and raider cues made live with Web Audio. Toggle with the speaker button by the radar.
- **Music:** seven ambient space soundscapes, shuffled with quiet gaps between them, mixed under the game and ducked when danger or sleep takes over. Toggle with the note button under the speaker. The soundtrack (about 11 MB) downloads in the background on first play and is kept for offline play across updates.

### Graphics
- **Look:** grounded, gritty realism. One hard star light in space with near-black shadow sides and only planet-shine as fill; harsh glare, haze and dust on the ground; a muted world where saturated colour comes from working lights, warning strobes, engines and screens.
- **Rendering:** HDR pipeline with a filmic (AgX-style) curve that lets highlights clip like a real camera, one restrained colour grade, bloom, god rays in atmosphere only, film grain, lens dirt and vignette (no lens-flare ghosts), image-based lighting, shadows and partial eye adaptation.
- **Weather and wear:** each planet type has its own weather (dust storms, wind-driven rain, snow, ash fall with dry lightning, toxic haze) that builds and breaks; your hull shows chipped paint, rust and soot as its condition drops and comes back clean after a repair; re-entry heat, landing dust and camera shake give the rig weight.
- **Surfaces:** layered ground materials (soil, sand, rock, snow) blended per pixel with triplanar rock on slopes, wet shorelines, moss-capped rocks and fake contact shadows; height fog with sun glow; drifting cloud shadows; dense wind-swept grass that glows when backlit; depth-tinted water with shore foam.
- **From orbit:** planets with continents, coastlines, mountain ridges, swirling cloud bands, rings and city lights on their night side.
- **Scales to the device:** Low, High and Epic graphics settings plus automatic dynamic resolution.

Progress (units, cargo, upgrades, fleet, current system) is saved in the browser's local storage.

## 3D models

Hand-made models live in `models/` as GLB files:

| File | What it is |
| --- | --- |
| `skiff.glb`, `mule.glb`, `longhaul.glb`, `atlas.glb`, `rook_twinboom.glb` | The five player and fleet hulls |
| `station_hub.glb`, `station_ring.glb` | The station's hub tower and spinning habitat wheel |
| `berth.glb`, `loader_arm.glb` | Pier berth module and the robot clamp arm |
| `customs_hall.glb`, `scanner_arch.glb` | The customs hall shell and the scanner arch over the scale |

The town kit (cores, district blocks and business buildings) is built in code for now; its model prompts are in [docs/town-kit-prompts.md](docs/town-kit-prompts.md), and each piece swaps to a model as soon as its `url` is set in `TOWN_KIT`.

All of them share one look: worn white industrial plating, burnt-orange trim, dark gunmetal frames and hazard striping.

**Adding or replacing a model:**
1. Export a single object as GLB (one copy only, no turnaround sheet, no ground plane).
2. Slim it with [gltf-transform](https://gltf-transform.dev/): `simplify --ratio 0.02 --error 0.002`, `resize --width 1024 --height 1024`, `jpeg --quality 82`, then `meshopt` (compresses and quantizes the geometry; a model ends up around 0.3–0.5 MB). The game decodes it with three.js's meshopt decoder.
3. Ships are configured in `SHIP_MODELS` in `index.html`: file, scale, turn (`rotY`), the height below which triangles count as landing legs (`legY`), engine nozzle positions for the flames, nav-light tips, and optional tilting pods. A file that holds two copies can be trimmed with `clipY` and re-centred with `center`.
4. Station pieces are configured in `ENV_MODELS` and placed by the station, pier and customs-hall builders.
5. Add the file to `CORE` in `sw.js` and bump `VERSION`.

**Loading:** at boot the game waits only for the station pieces and your current rig. The other hulls stream in one at a time afterwards; any rig that was built from the procedural stand-in while its model was still loading is swapped for the model in place. On the Low graphics setting model textures are halved to save phone memory.

The game ships its own engine flames, glows, nav lights and lights, so models don't need them baked in. Crates are part of the hull models, so hulls always look loaded.

## Roadmap

### Done recently
- **Town growth:** outposts grow into settlements, towns and cities with district rings as you deliver to them. The rings are built in code from a town kit whose pieces each carry a 3D-model prompt ([docs/town-kit-prompts.md](docs/town-kit-prompts.md)), so models can be swapped in later.
- **Business districts:** you choose a business for each plot (2 in a town, 5 in a city); each ships its own goods and pulls in the goods it needs. All deliveries still land at the town's one pad, by design.
- **Investing in towns:** buy shares from the Town tab; every 150 units adds 1 growth, and your stake pays an hourly income that rises with the town's stage and businesses. Your holdings are listed on the Town tab and the station's Fleet tab.
- **Fleet runs grow towns:** your hired crews' runs drop at towns in the system you're in and add a little growth, so a company and town shares pay off together.
- **Project town and warp colours:** focus on building one town at a time with guaranteed ★ loads on every board in its system, and see at a glance which jobs need a warp.
- **Fresh boards, project milestones, foldable cargo list:** boards turn over every 15 minutes, a project stage-up gets its own moment, and the HUD cargo list folds away.
- **My towns overview:** every town you've touched in one list, with progress, needs, businesses, stake and fleet help, plus set-project and route buttons.
- **Your home:** build a cabin in your project town and grow it into a house and an estate, with a private pad, a garage for your spare rigs, a workshop and free food and rest. Walk inside: from a one-room cabin to an estate with a trophy room and a glass lounge.
- **Your fleet in the world:** company rigs fly in and land at town pads on the planet you're on, and your pilots chat on the CB.

### Next up (in this order)
1. **Town kit models.** Generate the town pieces from [docs/town-kit-prompts.md](docs/town-kit-prompts.md) and swap them in: start with the town core and one ring-2 block to check the look in-game, then the rest of the blocks and the five business buildings.

### After that
2. **Freighters.** A capital ship that's both your company's headquarters and its biggest hauler:
   - Flown with the same controls as your rigs, but heavy: slow turns, lots of momentum, long braking. Pulse and warp, but it can't enter an atmosphere or dock at a station.
   - A hangar built from the same berth modules and clamp arms as the pier: launch your rig from it, run cargo down to the towns, and autopilot back in to dock.
   - Park it in a system and it becomes your base: hired crews and their rigs work contracts from it there.
   - The big growth jumps (town to city) need bulk construction loads only a freighter can bring into orbit; your rigs ferry it down.
3. **Bulk hauling.** Large station-to-station contracts sized for a freighter's hold.
4. **Upkeep, threats and upgrades for freighters.** Daily running costs (fuel, crew wages), raiders that target a parked freighter, and upgrades such as more hangar bays, cargo pods, crew quarters and a fuel refinery.
5. **More decisions on the road.** Moments like the contraband prompt, so autopilot runs stay interesting: distress calls, pirate offers, fuel-versus-time shortcuts.

### Housekeeping along the way
- ~~Load only the models needed at start and fetch the rest in the background.~~ Done: models are also meshopt-compressed (11.6 MB down to 4.7 MB).
- Phone performance: static town and pier props are merged to cut draw calls by about 40%. Still to check on a real phone: frame rate in cities (rings, traffic and lights), at night, and around the pier.
- Tune town growth pace once it's been played (currently 30 / 70 / 160 growth per stage; construction ×3, business goods ×2).
- Split `index.html` into modules and restore an automated test run, so new features can't quietly break old ones.

## Sound credits

Music in `audio/music/`: ambient soundscapes 001, 002, 003, 005, 006 and 007 by audiopapkin, and "Space Music Ambient" by freesound_community, from Pixabay under the Pixabay Content License (loudness-matched and re-encoded).

Recorded clips in `audio/` (trimmed, looped and re-encoded for the game) by dragon-studio, freesound_community, wolff-sfx, placidplace, forza1903, u_xg7ssi08yr, miraclei, daviddumaisaudio, arunangshubanerjee and 49053354, from Pixabay under the Pixabay Content License. Everything else is synthesised in code.
