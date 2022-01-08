import { httpSetup } from './http.setup'
import { logSetup } from './log.setup'

export default async function() {
    await logSetup()
    await httpSetup()
}
