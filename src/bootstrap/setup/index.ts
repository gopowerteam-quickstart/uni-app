import { httpSetup } from './http.setup'
import { componentSetup } from './component.setup'

export default async function () {
    await httpSetup()
    await componentSetup()
}
