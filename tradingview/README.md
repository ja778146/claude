# IFVG + Power of Three (AMD) Scalper

A TradingView **Pine Script v5** indicator that merges two ICT/SMC playbooks into one
buy/sell signal engine:

1. **Inversed Fair Value Gap (IFVG)** — finds 3-candle Fair Value Gaps, detects when price
   *closes through* a gap (inversion), and signals when price retraces back and **respects the
   Consequent Encroachment (50% midpoint)** of that flipped zone.
2. **Power of Three (Accumulation → Manipulation → Distribution)** — approximated with a
   **liquidity-sweep** detector. A wick that takes out a recent swing high/low and closes back
   inside is the "manipulation" stop-hunt that precedes distribution. Sell-side sweep = bullish,
   buy-side sweep = bearish.

By default a signal requires **both** concepts to agree (confluence), which is what improves
quality for scalping.

## Install

1. TradingView → **Pine Editor** (bottom panel).
2. Paste the contents of [`IFVG_AMD_Scalper.pine`](./IFVG_AMD_Scalper.pine).
3. **Add to chart**. Green **BUY** / red **SELL** labels print on closed bars.
4. (Optional) Create alerts on the included `BUY signal`, `SELL signal`, or `Any signal`
   conditions.

## Key settings

| Setting | What it does |
|---|---|
| **Signal mode** | `Confluence` (both, default), `Either`, `IFVG only`, or `Sweep only`. Switch to `Either` if you want more frequent signals. |
| **Confluence window** | How many bars the IFVG trigger and the sweep may be apart and still count as agreeing. |
| **Swing pivot lookback** | Sensitivity of the liquidity-sweep (manipulation) detector. Smaller = more sweeps. |
| **EMA trend filter** | Only allows BUYs above / SELLs below the EMA (default 200). Turn off for counter-trend scalps. |
| **Min bars between signals** | Cooldown to avoid clustered repeats. |
| **Min gap size (x ATR)** | Ignores tiny, noisy FVGs. |
| **Plot SL / TP** | Draws an ATR- or swing-based stop and an R:R-based target on each signal. |

## Suggested scalping starting points

- **1–5 min**: pivot lookback `5–8`, EMA `100–200`, confluence window `6–10`.
- More signals: Signal mode = `Either`, turn the EMA filter off.
- Fewer/cleaner: keep `Confluence`, raise the ATR gap filter to `0.3–0.5`.

## Honest note

No indicator is "extremely accurate" by itself — anyone claiming otherwise is selling something.
This codifies the two strategies into mechanical, **non-repainting** signals (each confirms at bar
close, not intrabar). **Backtest on your symbol/timeframe and always trade with a stop.** For
backtest stats, it can be converted to a `strategy()` with `strategy.entry`/`strategy.exit` calls.
