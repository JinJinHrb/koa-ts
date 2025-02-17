import { Server } from 'http'
import CONSTANTS from 'configs/constants'
import createServer from 'configs/application'
import { bootstrapAfter } from 'configs/bootstrap'
import { print } from 'app/helpers/fsUtils'

module.exports = (async (): Promise<Server | undefined> => {
  try {
    const app = await createServer()
    return app.listen(CONSTANTS.PORT, () => {
      print.log(`server listening on ${CONSTANTS.PORT}, in ${CONSTANTS.ENV_LABEL} mode.`)
      bootstrapAfter()
    })
  } catch (e) {
    print.danger(
      `bootstrapAfter error for server on ${CONSTANTS.PORT}, in ${
        CONSTANTS.ENV_LABEL
      } mode, ${(e as Error)?.message}`,
    )
  }
})()
