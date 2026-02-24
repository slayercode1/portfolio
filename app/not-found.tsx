'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-indigo-600 font-semibold">
            404 Error
          </h3>
          <p className="text-gray-800 text-4xl font-semibold sm:text-5xl dark:text-white">
            Page not found
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Sorry, the page you are looking for could not be found or has been removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant={"default"} onClick={() => router.push('/')}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
