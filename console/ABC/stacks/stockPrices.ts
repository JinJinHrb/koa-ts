type StackElement = { price: number; span: number }

class StockSpanner {
  prices: number[] = []
  spans: number[] = []
  stack: StackElement[] = []

  // 添加当日的股票价格，并计算跨度
  next(price: number) {
    let span = 1 // 初始化跨度为 1
    this.prices.push(price) // 将价格添加到价格数组中

    // 当栈不为空且栈顶价格小于等于当前价格时，持续出栈并累加跨度
    while (this.stack.length > 0 && this.stack[this.stack.length - 1].price <= price) {
      span += (this.stack.pop() as StackElement).span
    }

    // 将当前价格和跨度压入栈中
    this.stack.push({ price, span })
    this.spans.push(span)
  }

  // 获取跨度数组
  getSpans() {
    return this.spans
  }
}

/* 
输入：
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
输出：
[null, 1, 1, 1, 2, 1, 4, 6] 
*/
export const testStockSpanner = () => {
  const stockSpanner = new StockSpanner()
  stockSpanner.next(100) // 返回 1
  stockSpanner.next(80) // 返回 1
  stockSpanner.next(60) // 返回 1
  stockSpanner.next(70) // 返回 2
  stockSpanner.next(60) // 返回 1
  stockSpanner.next(75) // 返回 4 ，因为截至今天的最后 4 个股价 (包括今天的股价 75) 都小于或等于今天的股价。
  stockSpanner.next(85) // 返回 6
  console.log('#45 spans:', stockSpanner.getSpans())
}
