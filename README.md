[![npm](https://img.shields.io/npm/v/@deep-foundation/capacitor-screen-reader.svg)](https://www.npmjs.com/package/<PACKAGE_NAME>) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/capacitor-screen-reader) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links based on [`@capacitor/screen-reader`](https://www.npmjs.com/package/@capacitor/screen-reader). 

[**Documentation**](https://deep-foundation.github.io/capacitor-screen-reader/) 

[**List of links**](https://deep-foundation.github.io/capacitor-screen-reader/enums/LinkName.html)

## SpeakOptions Object Value

The [`SpeakOptions`] link can have object value.  
No one field is required. You can add any fields as you want.  Only the fields that are supported by this package will be represented as links   
[Supported fields can be found in the `SpeakOptions` interface](https://capacitorjs.com/docs/apis/screen-reader#speakoptions)  

## Prerequisitions
- Install this package in your deep by using npm-packager
- Provide permissions to this package

## Usage

### Manually
1. Insert a link of type [`ScreenOptions`] 
2.  Change its object value to the object with properties described in [SpeakOptions Object Value](#md:screen-reader-object-value) and this update will be handled by the [`UpdateHandler`](https://freephoenix888.github.io/object-to-links-async-converter/enums/LinkName.html#UpdateHandler) to represent [`ScreenOptions`] object value as links
or  
Insert a link of any type with a any name of the list described in [SpeakOptions Object Value](#md:screen-reader-object-value) from [`ScreenOptions`] link to the same [`ScreenOptions`] link and set its value to the value of the corresponding property of the [`ScreenOptions`] object value

### By using this library programatically
- [Get Speak Options Insert Serial Operations](https://deep-foundation.github.io/capacitor-screen-reader/functions/getSpeakOptionsInsertSerialOperations.html)  

## Update Handling

[`ScreenOptions`] updates are handled by the [`UpdateHandler`](https://freephoenix888.github.io/object-to-links-async-converter/enums/LinkName.html#UpdateHandler) to represent [`ScreenOptions`] object value as links

## Contribution

Feel free to contribute. Please fork the repository and submit a pull request for any bugs, improvements, or features.

[`ScreenOptions`]: https://deep-foundation.github.io/capacitor-screen-reader/enums/LinkName.html#Screen-reader