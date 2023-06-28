import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { LinkName } from './link-name';
import { PACKAGE_NAME } from './package-name';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { SpeakOptions } from '@capacitor/screen-reader';

/**
 * Gets serial operations to insert SpeakOptions
 * 
 * @example
```ts
const serialOperations = await getSpeakOptionsInsertSerialOperations({
  deep,
  speakOptions: {
    value: "Hello world",
    language: "en"
  }
});
await deep.serial({
  operations: serialOperations
})
```
 */
export async function getSpeakOptionsInsertSerialOperations(
  param: InsertSpeakOptionsParam
): Promise<Array<SerialOperation>> {
  const { deep, speakOptions, containValue, containerLinkId } = param;
  const { containLinkId, speakOptionsLinkId } = await getReservedLinkIds();
  const { containTypeLinkId, speakOptionsTypeLinkId } = await getTypeLinkIds();
  const serialOperations = [];
  const speakOptionsInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: speakOptionsLinkId,
      type_id: speakOptionsTypeLinkId,
    },
  });
  serialOperations.push(speakOptionsInsertSerialOperation);
  const valueOfSpeakOptionsInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'objects',
    objects: {
      link_id: speakOptionsLinkId,
      value: speakOptions,
    },
  });
  serialOperations.push(valueOfSpeakOptionsInsertSerialOperation);
  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: containTypeLinkId,
        from_id: containerLinkId || deep.linkId,
        to_id: speakOptionsLinkId,
      },
    });
    serialOperations.push(containInsertSerialOperation);
    const valueOfContainInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: containLinkId,
        value: containValue,
      },
    });
    serialOperations.push(valueOfContainInsertSerialOperation);
  }

  return serialOperations;

  type GetReservedLinkIdsResult = Exclude<
    InsertSpeakOptionsParam['reservedLinkIds'],
    undefined
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containLinkId: 0,
      speakOptionsLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      speakOptionsLinkId:
        param.reservedLinkIds?.speakOptionsLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Exclude<
    InsertSpeakOptionsParam['typeLinkIds'],
    undefined
  >;

  async function getTypeLinkIds(): Promise<GetTypeLinkIdsResult> {
    const result: GetTypeLinkIdsResult = {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      speakOptionsTypeLinkId:
        param.typeLinkIds?.speakOptionsTypeLinkId ||
        (await deep.id(PACKAGE_NAME, LinkName[LinkName.SpeakOptions])),
    };
    return result;
  }
}

export interface InsertSpeakOptionsParam {
  reservedLinkIds?: {
    speakOptionsLinkId: number;
    containLinkId: number;
  };
  typeLinkIds?: {
    containTypeLinkId?: number;
    speakOptionsTypeLinkId?: number;
  };
  deep: DeepClient;
  speakOptions: SpeakOptions;
  containerLinkId?: number | undefined | null;
  containValue?: string | undefined;
}
