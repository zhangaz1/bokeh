export type Context2d = {
  setLineDashOffset(offset: number): void
  getLineDashOffset(): number
  setImageSmoothingEnabled(value: boolean): void
  getImageSmoothingEnabled(): boolean
  measureText(text: string): TextMetrics & {ascent: number}
} & CanvasRenderingContext2D

function fixup_line_dash_offset(ctx: CanvasRenderingContext2D): void {
  (ctx as any).setLineDashOffset = (offset: number): void => {
    ctx.lineDashOffset = offset
  }
  (ctx as any).getLineDashOffset = (): number => {
    return ctx.lineDashOffset
  }
}

function fixup_image_smoothing(ctx: CanvasRenderingContext2D): void {
  (ctx as any).setImageSmoothingEnabled = (value: boolean): void => {
    ctx.imageSmoothingEnabled = value
  }
  (ctx as any).getImageSmoothingEnabled = (): boolean => {
    return ctx.imageSmoothingEnabled
  }
}

function fixup_measure_text(ctx: CanvasRenderingContext2D): void {
  const html5MeasureText = ctx.measureText

  ctx.measureText = (text: string) => {
    const textMetrics = html5MeasureText(text)
    // fake it til you make it
    const ascent = html5MeasureText("m").width * 1.6
    return {...textMetrics, ascent}
  }
}

export function fixup_ctx(ctx: any): void {
  fixup_line_dash_offset(ctx)
  fixup_image_smoothing(ctx)
  fixup_measure_text(ctx)
}
