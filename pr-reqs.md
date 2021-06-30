# PR Requirements

Any user can submit PRs to add new models to this repo. The PRs must follow the  guidelines described in this document.

## Creating good pull requests

We look at pull requests to `main` carefully as the models that go to this branch are released to our public [DTDL v2](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md) repository via our deployment processes. We will have additional automated gates that must be cleared before manual review will occur. The following list contains major items that **must** be true to have your pull request accepted.

### Model file names

- Model file names **must** be in lower case.
- Model files **must** end in `.json`.
- Model file names **must** resemble the root `@id` value. All `:` **must** be substituted with `/` and all `;` must be substituted with `-`.

> Example: a file for `dtmi:com:Example:Thermostat;1` **must** be named `dtmi/com/example/thermostat-1.json`

### Model file content structure

- Model files **must** contain a single root object. No other types (such as array) are supported for the root element.
- Model file content **must** conform to the [DTDL v2](https://aka.ms/dtdl) specification.

### Root object `@id` property

- An `@id` property **must** exist on the root object.
- The `@id` property **must** conform to [DTMI regular expression](https://github.com/Azure/digital-twin-model-identifier#validation-regular-expressions).

### Scoping `@id` on non-root elements

DTDL contents (telemetry, properties, components, schemas) may contain `@id` properties that follow the DTMI specification. Within the context of this repository, we will refer to these values as sub-Ids.

- sub-Ids **must** be scoped under the root DTMI.

> Example: a file specifying `dtmi:com:example:person;1` can have a schema defined for `dtmi:com:example:person:phoneNumber;1` but cannot have a schema defined for `dtmi:com:telephone:number;1`

### Resolving referenced DTMIs

DTMIs may be contained in other files in this repository (examples include component definitions or extending a root model).

- Referenced DTMIs must be resolvable within **this** repository, either as existing documents or included with your pull request. All rules listed will apply to their inclusion.

### Reserved words

The following words are generally disallowed from being in any `@id` property of a DTDL document, regardless of casing:

- Azure
- Microsoft
- AzureIoT
- MicrosoftIoT

### Deletions and edits

Deletions and edits of previously released models is highly discouraged. Any number of downstream products may have taken a dependency on your model once it has been submitted. Therefore, this is seen as a **breaking change** to your device model. Therefore, models should always be additive and completely new DTMI should be used for major changes from existing DTDL documents.

## Creating new versions of models

As the repository grows, we may require that new version of DTDL documents be approved by users that have submitted earlier versions of the DTDL. This will be handled by the use of a CODEOWNERS file in the root of the repository. An example would be:
> /dtmi/azure/devicemanagement/deviceinformation- @montgomp

Since user @montgomp created `/dtmi/azure/devicemanagement/deviceinformation-1.json`, any new revision such as `/dtmi/azure/devicemanagement/deviceinformation-2.json` would need to be approved by them before the pull request can continue.