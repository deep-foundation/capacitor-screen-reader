
import {
  Package as BasePackage,
  PackageOptions as BasePackageOptions,
} from '@deep-foundation/deeplinks/imports/package.js';

/**
Represents a deep package

@remarks
Contains name of the package and all the links as the objects with id method which returns the id of the link.

@example
#### Use name field to get the name of the package
```ts
const package = new Package({deep});
const {name: packageName} = package;
```
#### Use id method to get the id of the link
```ts
const package = new Package({deep});
const speakOptionsTypeLinkId = await package["SpeakOptions"].id();
const notifyTypeLinkId = await package["Notify"].id();
const notifiedTypeLinkId = await package["Notified"].id();
const languageTypeLinkId = await package["Language"].id();
const valueTypeLinkId = await package["Value"].id();
```

#### Use idLocal method to get the local id of the link
```ts
const package = new Package({deep});
await package.applyMinilinks();
const speakOptionsTypeLinkId = package["SpeakOptions"].idLocal();
const notifyTypeLinkId = package["Notify"].idLocal();
const notifiedTypeLinkId = package["Notified"].idLocal();
const languageTypeLinkId = package["Language"].idLocal();
const valueTypeLinkId = package["Value"].idLocal();
```
#### Use name field to get the name of the link
```ts
const package = new Package({deep});
const speakOptions = package["SpeakOptions"].name;
const notify = package["Notify"].name;
const notified = package["Notified"].name;
const language = package["Language"].name;
const value = package["Value"].name;
```
*/
export class Package extends BasePackage {

  constructor(param: PackageOptions) {
    super({
      ...param,
      name: '@deep-foundation/capacitor-screen-reader',
    });
  }


      /**
      @example
      #### Use id method to get the id of the SpeakOptions link
      ```ts
      const package = new Package({deep});
      const speakOptionsTypeLinkId = await package["SpeakOptions"].id();
      ```
      #### Use localId method to get the local id of the SpeakOptions link
      ```ts
      const package = new Package({deep});
      const speakOptionsTypeLinkId = await package["SpeakOptions"].localId();
      ```
      #### Use name field to get the name of the SpeakOptions link
      ```ts
      const package = new Package({deep});
      const speakOptions = await package["SpeakOptions"].name;
      ```
      */
      public "SpeakOptions" = this.createEntity("SpeakOptions");
      /**
      @example
      #### Use id method to get the id of the Notify link
      ```ts
      const package = new Package({deep});
      const notifyTypeLinkId = await package["Notify"].id();
      ```
      #### Use localId method to get the local id of the Notify link
      ```ts
      const package = new Package({deep});
      const notifyTypeLinkId = await package["Notify"].localId();
      ```
      #### Use name field to get the name of the Notify link
      ```ts
      const package = new Package({deep});
      const notify = await package["Notify"].name;
      ```
      */
      public "Notify" = this.createEntity("Notify");
      /**
      @example
      #### Use id method to get the id of the Notified link
      ```ts
      const package = new Package({deep});
      const notifiedTypeLinkId = await package["Notified"].id();
      ```
      #### Use localId method to get the local id of the Notified link
      ```ts
      const package = new Package({deep});
      const notifiedTypeLinkId = await package["Notified"].localId();
      ```
      #### Use name field to get the name of the Notified link
      ```ts
      const package = new Package({deep});
      const notified = await package["Notified"].name;
      ```
      */
      public "Notified" = this.createEntity("Notified");
      /**
      @example
      #### Use id method to get the id of the Language link
      ```ts
      const package = new Package({deep});
      const languageTypeLinkId = await package["Language"].id();
      ```
      #### Use localId method to get the local id of the Language link
      ```ts
      const package = new Package({deep});
      const languageTypeLinkId = await package["Language"].localId();
      ```
      #### Use name field to get the name of the Language link
      ```ts
      const package = new Package({deep});
      const language = await package["Language"].name;
      ```
      */
      public "Language" = this.createEntity("Language");
      /**
      @example
      #### Use id method to get the id of the Value link
      ```ts
      const package = new Package({deep});
      const valueTypeLinkId = await package["Value"].id();
      ```
      #### Use localId method to get the local id of the Value link
      ```ts
      const package = new Package({deep});
      const valueTypeLinkId = await package["Value"].localId();
      ```
      #### Use name field to get the name of the Value link
      ```ts
      const package = new Package({deep});
      const value = await package["Value"].name;
      ```
      */
      public "Value" = this.createEntity("Value");

}

export type PackageOptions = Omit<BasePackageOptions, 'name'>;
