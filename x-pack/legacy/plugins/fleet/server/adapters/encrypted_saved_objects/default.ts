/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SavedObjectsBaseOptions, SavedObjectAttributes, SavedObject } from 'src/core/server';
import { EncryptedSavedObjectsPluginStart } from '../../../../../../plugins/encrypted_saved_objects/server';
import { EncryptedSavedObjects as EncryptedSavedObjectsType } from './adapter_types';

export class EncryptedSavedObjects implements EncryptedSavedObjectsType {
  constructor(private readonly plugin: EncryptedSavedObjectsPluginStart) {}

  public async getDecryptedAsInternalUser<T extends SavedObjectAttributes = any>(
    type: string,
    id: string,
    options?: SavedObjectsBaseOptions
  ): Promise<SavedObject<T>> {
    return await this.plugin.getDecryptedAsInternalUser<T>(type, id, options);
  }
}
