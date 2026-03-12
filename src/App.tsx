// import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from './router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient ({
    defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        richColors
        expand={true} 
        duration={5000}  
      />
    </QueryClientProvider>
  )
}

export default App