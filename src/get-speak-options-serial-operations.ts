import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { LinkName } from './link-name';
import { PACKAGE_NAME } from './package-name';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { SpeakOptions } from '@capacitor/screen-reader';

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

  async function getReservedLinkIds(): Promise<
    Exclude<InsertSpeakOptionsParam['reservedLinkIds'], undefined>
  > {
    if (param.reservedLinkIds) {
      return param.reservedLinkIds;
    } else {
      let result = {
        containLinkId: 0,
        speakOptionsLinkId: 0,
      };
      const linksToReserveCount = Object.keys(result).length;
      const reservedLinkIds = await deep.reserve(linksToReserveCount);
      result = {
        containLinkId: reservedLinkIds.pop()!,
        speakOptionsLinkId: reservedLinkIds.pop()!,
      };
      return result;
    }
  }

  async function getTypeLinkIds(): Promise<
    Required<Exclude<InsertSpeakOptionsParam['typeLinkIds'], undefined>>
  > {
    return {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      speakOptionsTypeLinkId:
        param.typeLinkIds?.speakOptionsTypeLinkId ||
        (await deep.id(PACKAGE_NAME, LinkName[LinkName.SpeakOptions])),
    };
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
