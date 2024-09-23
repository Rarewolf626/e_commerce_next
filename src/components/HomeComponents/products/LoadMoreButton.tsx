
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Products from "./Products"

export default function LoadMoreProducts() {
  const [visibleProducts, setVisibleProducts] = useState(4)

  const handleLoadMore = () => {
    setVisibleProducts(visibleProducts + 4)
  }

  return (
    <div>
      {/* Server component rendering products */}
      <Products limit={visibleProducts} />

      {/* Load more button */}
      <div className="mt-8 text-center">
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </div>
  )
}
