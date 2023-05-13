export interface Units {
  BTC: Unit;
  mBTC: Unit;
  µBTC: Unit;
  Sats: Unit;
}

export type KeysProps = keys<Units>;

type Unit = number[];

export type UnitStates = "BTC" | "mBTC" | "µBTC" | "Sats";
