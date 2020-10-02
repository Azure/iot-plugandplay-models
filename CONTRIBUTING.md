# Contributing

This project welcomes contributions and suggestions. Most contributions require you to
agree to a Contributor License Agreement (CLA) declaring that you have the right to,
and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need
to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the
instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Creating good pull requests
We look at pull requests to `main` carefully as the models that go to this branch are released to our public [DTDL](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md) repository via our deployment processes. We will have additional automated gates that must be cleared before manual review will occur. The following list contains major items that **must** be true to have your pull request accepted.
### File types
- Files must conform to [JSON-LD](https://json-ld.org/) and [DTDL](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md) specifications.
### File names
- File names **must** be in lower case.
- Files **must** end in `.json`.
- File names **must** resemble the root `@id` value. All `:` **must** be substituted with `/` and all `;` must be substituted with `-`.
> Example: a file for `dtmi:com:Example:Thermostat;1` **must** be named `dtmi/com/example/thermostat-1.json`
### Root `@id` element
- An `@id` property **must** exist on the root element.
- The `@id` property **must** conform to [DTMI regular expression](https://github.com/Azure/digital-twin-model-identifier#validation-regular-expressions)
### Scoping `@id` on non-root items
DTDL contents (telemetry, properties, components, schemas) may contain `@id` properties that follow the DTMI specification. Within the context of this repository, we will refer to these values as sub-Ids.
- sub-Ids **must** be scoped under the root DTMI.
> Example: a file specifying `dtmi:com:example:person;1` can have a schema defined for `dtmi:com:example:person:phoneNumber;1` but cannot have a schema defined for `dtmi:com:telephone:number;1`
### Resolving referenced DTMIs
DTMIs may be contained in other files in this repository (examples include component definitions or extending a root model).
- Referenced DTMIs must be resolvable within **this** repository, either as existing documents or included with your pull request. All rules listed will apply to their inclusion.
### Reserved words
- Scans for certain reserved words will be performed on every `@id` property. These reserved words will be listed in `./RESERVED_WORDS.md`
### Deletions and edits
Deletions and edits of previously released models is highly discouraged. Any number of downstream products may have taken a dependency on your model once it has been submitted. Therefore, this is seen as a **breaking change** to your device model. Therefore, models should always be additive and completely new DTMI should be used for major changes from existing DTDL documents.

## Creating new versions of models
As the repository grows, we may require that new version of DTDL documents be approved by users that have submitted earlier versions of the DTDL. This will be handled by the use of a CODEOWNERS file in the root of the repository. An example would be:
> /dtmi/azure/devicemanagement/deviceinformation- @montgomp

Since user @montgomp created `/dtmi/azure/devicemanagement/deviceinformation-1.json`, any new revision such as `/dtmi/azure/devicemanagement/deviceinformation-2.json` would need to be approved by them before the pull request can continue.