❗ As of February 2024, the Azure Certified Device program has been retired.

Therefore, Microsoft is no longer accepting submissions of DTDL models to the [iot-plugandplay-models](https://github.com/Azure/iot-plugandplay-models) repository.

You can still search for and retrieve existing DTDL models from https://devicemodels.azure.com and use [DMR ecosystem tools](https://github.com/Azure/iot-plugandplay-models-tools) such as [Microsoft.IoT.ModelsRepository.CommandLine](https://www.nuget.org/packages/Microsoft.IoT.ModelsRepository.CommandLine) (aka `dmr-client`) or the [ModelsRepositoryClient](https://www.nuget.org/packages/Azure.IoT.ModelsRepository) SDK.

---

# Azure/iot-plugandplay-models repository

This repository includes [DTDL](https://aka.ms/dtdl) models that are made publicly available on [https://devicemodels.azure.com](https://devicemodels.azure.com). These models can be used to create Azure [IoT Plug and Play](https://aka.ms/iotpnp) solutions.

Related tools, samples, and specs can be found in the [Azure/iot-plugandplay-models-tools](https://github.com/Azure/iot-plugandplay-models-tools) repo. The current repo only stores DTDL models.

## Install the `dmr-client` command line tool

The tool used to validate the models during the PR checks can also be used to add and validate the DTDL interfaces locally.

The Device Models Repository command line tool (aka `dmr-client`) is published on [NuGet](https://www.nuget.org/packages/Microsoft.IoT.ModelsRepository.CommandLine) and requires `dotnet sdk 3.1.x`, `5.0.x` or `6.0.x`.

You can use the `dotnet` command line via the `dotnet tool install` command to install `dmr-client`. The following is an example to install `dmr-client` as a global tool:

```bash
dotnet tool install -g Microsoft.IoT.ModelsRepository.CommandLine --version 1.0.0-beta.6
```

To learn how to install `dmr-client` in a local context, please see [this guide](https://docs.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use).

> Note: Previous versions of the tool (prior to `1.0.0-beta.3`) must first be uninstalled with `dotnet tool uninstall -g dmr-client`. Use the `dotnet tool list -g` command to check the id of the tool you want to uninstall.

### Update

To update the `dmr-client` tool (assuming a global install) you can run the following command:

```bash
dotnet tool update -g Microsoft.IoT.ModelsRepository.CommandLine --version [target version]
```

### Uninstall

To uninstall the `dmr-client` tool (assuming a global install) you can run the following command:

```bash
dotnet tool uninstall -g Microsoft.IoT.ModelsRepository.CommandLine
```

## Usage of `dmr-client`

After installing `Microsoft.IoT.ModelsRepository.CommandLine` the following models repository management commands should be available for usage via the `dmr-client` alias.

```text
dmr-client
  Microsoft IoT Models Repository CommandLine v1.0.0-beta.6

Usage:
  dmr-client [options] [command]

Options:
  --debug         Shows additional logs for debugging. [default: False]
  --silent        Silences command output on standard out. [default: False]
  --version       Show version information
  -?, -h, --help  Show help and usage information

Commands:
  export    Exports a model producing the model and its dependency chain in an expanded format. 
            The target repository is used for model resolution.
  validate  Validates the DTDL model contained in a file. When validating a single model object the target repository
            is used for model resolution. When validating an array of models only the array contents is used for resolution.
  import    Imports models from a model file into the local repository. The local repository is used for model resolution.
            Target model files for import will first be validated to ensure adherence to IoT Models Repository conventions.
  index     Builds a model index file from the state of a target local models repository.
  expand    For each model in a local repository, generate expanded model files and insert them in-place.
            The expanded version of a model includes the model with its full model dependency chain.
```

## Command Guide

### Import a Model to the `dtmi/` folder

If you have your model already stored in json files, you can use the `dmr-client import` command to add those to the `dtmi/` folder with the right file name.

Run this from the local repo root folder

```bash
dmr-client import --model-file "MyThermostat.json"
```

> This command will rename and locate the file in the appropriate folder

### Validate Models

You can validate your models with the `dmr-client validate` command.

To validate a model file using the DTDL parser.

```bash
dmr-client validate --model-file ./my/model/file.json
```

> Note: The validation uses the latest DTDL parser version to ensure all the interfaces are compatible with the DTDL language spec

To validate external dependencies, those must exist in the local repo. To validate those you can specify a `local` or `remote` folder to validate against.

Validating a model file using the DTDL parser checking dependencies with the current folder as a local repo.

```bash
dmr-client validate --model-file ./my/model/file.json --repo .
```

### Strict validation

The Device Model Repo includes additional [requirements](pr-reqs.md), these can be validated with the `strict` flag.

Validating a model file using the DTDL parser checking dependencies with the current folder as a local repo in strict mode.


```bash
dmr-client validate --model-file ./my/model/file.json --repo . --strict
```

### Export models

Models can be exported from a given repo (local or remote) to a single file using a JSON Array.

Retrieving an interface from a custom repo by DTMI:

```bash
dmr-client export --dtmi "dtmi:com:example:Thermostat;1" --repo https://raw.githubusercontent.com/Azure/iot-plugandplay-models/main
```

### Create Index

The model repo can host a `index.json` file with all the `ids` avaialble in the repository. Read the [Index Spec](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Model-Index)

Building a model index for the repository. If models exceed the page limit new page files will be created relative to the root index.

```bash
dmr-client index --local-repo .
```

Building a model index with a custom page limit indicating max models per page.

```bash
dmr-client index --local-repo . --page-limit 100
```

### Create Expanded files

To expand all models from the root directory of a local models repository following Azure IoT conventions. Expanded models are inserted in-place.

```bash
dmr-client expand --local-repo .
```

The default `--local-repo` value is the current directory. Be sure to specify the root for `--local-repo`.

```bash
dmr-client expand
```

## IoT Models Repository SDKs

Azure SDKs focused on models repository consumption are available in the following languages:

|Platform|Package|Source|Samples|
|--------|-------|------|-------|
|.NET | [Azure.IoT.ModelsRepository](https://www.nuget.org/packages/Azure.IoT.ModelsRepository)|[Source](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/modelsrepository/Azure.IoT.ModelsRepository)|[Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/modelsrepository/Azure.IoT.ModelsRepository/samples)|
|Java |[com.azure/azure-iot-modelsrepository](https://search.maven.org/artifact/com.azure/azure-iot-modelsrepository)|[Source](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/modelsrepository/azure-iot-modelsrepository)|[Samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/modelsrepository/azure-iot-modelsrepository/src/samples)|
|Node|[@azure/iot-modelsrepository](https://www.npmjs.com/package/@azure/iot-modelsrepository)|[Source](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/iot/iot-modelsrepository)|[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/iot/iot-modelsrepository/samples/v1)|
|Python|[azure-iot-modelsrepository](https://pypi.org/project/azure-iot-modelsrepository/)|[Source](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/modelsrepository/azure-iot-modelsrepository)|[Samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/modelsrepository/azure-iot-modelsrepository/samples)|

## Fetch models without any SDK

Any HTTP client can consume the models by applying the repository [convention](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Resolution-Convention) to convert a `DTMI` to a relative path:

Eg, the interface:

```bash
dtmi:azure:DeviceManagement:DeviceInformation;1
```

can be retrieved from [here](https://devicemodels.azure.com/dtmi/azure/devicemanagement/deviceinformation-1.json):

```bash
https://devicemodels.azure.com/dtmi/azure/devicemanagement/deviceinformation-1.json
```

There are samples for .NET and Node in the [Azure/iot-plugandplay-models-tools](https://github.com/Azure/iot-plugandplay-models-tools) GitHub repository with code you can use to acquire models for your custom IoT solution.
