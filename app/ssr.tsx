import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createAppRouter } from './router'

export default createStartHandler({
  createRouter: createAppRouter,
})(defaultStreamHandler)
