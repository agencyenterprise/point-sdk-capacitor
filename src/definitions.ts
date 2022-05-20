export interface PointSDKPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
