# Order Blocks Finder — Strategy Version

`OrderBlocksFinder_Strategy.pine` is a `strategy()` conversion of the TradingFinder
"Order Blocks Finder" indicator. All order-block / supply-demand detection logic is
preserved verbatim from the original indicator; only a trade-execution layer is added.

## How it trades

The strategy reuses the indicator's own zone-tap events as entries:

| Signal | Trigger | Stop | Take-profit |
|--------|---------|------|-------------|
| Long  | price taps a **Demand** proximal (`YDp12`) | Demand distal (`YDd12`) | `entry + R × stop-distance` |
| Short | price taps a **Supply** proximal (`YSp12`) | Supply distal (`YSd12`) | `entry − R × stop-distance` |

If the signal bar already closed *beyond* the distal (zone invalidated), the entry is skipped.

## Inputs (Strategy group)

- **Trade Direction** — Both / Long Only / Short Only.
- **Take Profit (R multiple)** — TP distance as a multiple of the stop distance. Default `2.0`.
- **Use Stop Loss at Zone Distal** — place the protective stop at the distal line. Default on.
- **Stop Buffer (%)** — extra padding beyond the distal, as a percent of price.
- **Exit on Opposite Zone Tap** — in single-direction modes, close the open position when the
  opposite zone is tapped (in *Both* mode the opposite entry already reverses the position).

Backtest defaults: 10% equity per trade, 0.04% commission, `initial_capital = 10000`.

## Important caveats

- **Keep `calc_on_every_tick` OFF.** Signals are derived from `close`/`high`/`low`; evaluating
  intrabar would repaint entries. On bar close (default) historical fills are stable.
- **Confirmation lag is inherent.** A zone is only confirmed after a Break of Structure, so entries
  arrive after the order-block candle forms — by design.
- **Known logic bugs were left as-is** (faithful conversion). From the earlier review, the Supply-side
  refinement has a couple of genuine bugs (a `Dmin*` variable used inside the Supply refiner, and an
  inconsistent `-1`/`+1` neighbor index that can leave a stale boundary). These can shift some supply
  zone edges, which in turn affects short entries/stops. Fix these separately if you want cleaner shorts.
