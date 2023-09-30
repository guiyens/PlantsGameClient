export default interface IDictionary<TValue> {
  [id: string]: TValue | Array<TValue> | undefined;
}
