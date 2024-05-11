import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { useScreenReaderSubscription } from "../use-screen-reader-subscription";

export function WithScreenReaderSubscription({deep, deviceLinkId}: {deep: DeepClient, deviceLinkId: number}) {
   useScreenReaderSubscription({deep, deviceLinkId})

   return null
}