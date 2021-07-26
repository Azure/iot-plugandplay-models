
# Azure/iot-plugandplay-models repository

This repository includes [DTDL](https://aka.ms/dtdl) models that are made publicly available on [https://devicemodels.azure.com](https://devicemodels.azure.com). These models can be used to create Azure [IoT Plug and Play](https://aka.ms/iotpnp) solutions.

Related tools, samples, and specs can be found in the [Azure/iot-plugandplay-models-tools](https://github.com/Azure/iot-plugandplay-models-tools) repo. The current repo only stores DTDL models.

## Submit a model

1. Create a GitHub account if you do not have one yet: [Join GitHub](https://github.com/join).

    [Learn more about GitHub](https://docs.microsoft.com/learn/modules/intro-to-git/)

1. Sign [Contributor License Agreement](https://cla.opensource.microsoft.com/Azure/iot-plugandplay-models?pullRequest=93)

1. Fork the public GitHub repo: [https://github.com/Azure/iot-plugandplay-models](https://github.com/Azure/iot-plugandplay-models).

    [Learn more about forking a repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)

1. Clone the forked repo. Optionally create a new branch to keep your changes isolated from the `main` branch.

    By forking and cloning the public GitHub repo, a copy of repo will be created in your GitHub account and a local copy is created in your dev machine.  Please use this local copy to make modifications.

1. Author a new device model with an unique ID using [Digital Twin Model Identifier](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#digital-twin-model-identifier).  

    Review the [PR requirements](pr-reqs.md) for naming conventions.

    > [!TIP]  
    > [DTDL Editor for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-dtdl) could help you with the language syntax (including auto-completion) and also validate the syntax with DTDL v2.

1. Save the device model JSON file to a local folder.  

    E.g.
    `C:\iot-plugandplay-models\MyThermostat.json`

1. Validate the models locally using the `dmr-client` tool to [validate](#validate-models).
1. Add the new interfaces to the `dtmi` folder using the folder/filename convention. See the [import](#import-a-model-to-the-dtmi-folder) command below.
1. Review and cross check with the [PR requirements](pr-reqs.md) and ensure all elements are conform to [DTDL v2](https://aka.ms/dtdl) specification.
1. Commit the changes locally and push to your fork.
1. From your fork, create a PR that targets the `main` branch.  

    [Learn more about pull request](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/creating-an-issue-or-pull-request#creating-a-pull-request)

The PR triggers a series of GitHub actions that will validate the new submitted interfaces, and make sure your PR satisfies all the checks.

Microsoft will respond to a PR with all checks in 3 business days.

## GitHub Operation Workflow

```text
+-------------------------------------------------+
| iot-plugandplay-models repo (Microsoft)           |
+-------------------------------------------------+
  |          ⭡
  | Fork     | Pull Request (PR)
  🡓          |
+-------------------------------------------------+
| iot-plugandplay-models repo (your Github account) |
+-------------------------------------------------+
  |          ⭡ 
  | Clone    | Commit/Push
  🡓          |
+-------------------------------------------------+
| Your development PC                             |
| - Author device model                           |
| - Import your model to the DTMI folder          |
+-------------------------------------------------+

```

## Install the `dmr-client` command line tool

The tool used to validate the models during the PR checks can also be used to add and validate the DTDL interfaces locally.

The Device Models Repository command line tool (aka `dmr-client`) is published on [NuGet](https://www.nuget.org/packages/Microsoft.IoT.ModelsRepository.CommandLine) and requires `dotnet sdk 3.1` or `dotnet sdk 5.0`.

> Note: .NET 6 is not yet supported.

You can use the `dotnet` command line via the `dotnet tool install` command to install `dmr-client`. The following is an example to install `dmr-client` as a global tool:

```bash
> dotnet tool install -g Microsoft.IoT.ModelsRepository.CommandLine --version 1.0.0-beta.4
```

To learn how to install `dmr-client` in a local context, please see [this guide](https://docs.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use).

> Note: Previous versions of the tool (prior to `1.0.0-beta.3`) must first be uninstalled with `dotnet tool uninstall -g dmr-client`. Use the `dotnet tool list -g` command to check the id of the tool you want to uninstall.

### Update

To update the `dmr-client` tool (assuming a global install) you can run the following command:

```bash
> dotnet tool update -g Microsoft.IoT.ModelsRepository.CommandLine --version [target version]
```

### Uninstall

To uninstall the `dmr-client` tool (assuming a global install) you can run the following command:

```bash
> dotnet tool uninstall -g Microsoft.IoT.ModelsRepository.CommandLine
```

## Usage of `dmr-client`

After installing `Microsoft.IoT.ModelsRepository.CommandLine` the following models repository management commands should be available for usage via the `dmr-client` alias.

```text
dmr-client:
  Microsoft IoT Models Repository CommandLine v1.0.0-beta.4

Usage:
  dmr-client [options] [command]

Options:
  --debug           Shows additional logs for debugging.
  --silent          Silences command output on standard out.
  --version         Show version information
  -?, -h, --help    Show help and usage information

Commands:
  export      Exports a model producing the model and its dependency chain in an expanded format. The target repository is used for model resolution.
  validate    Validates the DTDL model contained in a file. When validating a single model object the target repository is used for model resolution. When
              validating an array of models only the array contents is used for resolution.
  import      Imports models from a model file into the local repository. The local repository is used for model resolution.
  index       Builds a model index file from the state of a target local models repository.
  expand      For each model in a local repository, generate expanded model files and insert them in-place. The expanded version of a model includes the model with
              its full model dependency chain.
```

## Command Guide

### Import a Model to the `dtmi/` folder

If you have your model already stored in json files, you can use the `dmr-client import` command to add those to the `dtmi/` folder with the right file name.

```bash
# from the local repo root folder

> dmr-client import --model-file "MyThermostat.json"
```

> This command will rename and locate the file in the appropriate folder

### Validate Models

You can validate your models with the `dmr-client validate` command.

```bash
# Validate a model file using the DTDL parser

> dmr-client validate --model-file ./my/model/file.json
```

> Note: The validation uses the latest DTDL parser version to ensure all the interfaces are compatible with the DTDL language spec

To validate external dependencies, those must exist in the local repo. To validate those you can specify a `local` or `remote` folder to validate against.

```bash
# Validate a model file using the DTDL parser checking dependencies with the current folder as a local repo

> dmr-client validate --model-file ./my/model/file.json --repo .
```

### Strict validation

The Device Model Repo includes additional [requirements](pr-reqs.md), these can be validated with the `strict` flag.

```bash
# Validate a model file using the DTDL parser checking dependencies with the current folder as a local repo in strict mode

> dmr-client validate --model-file ./my/model/file.json --repo . --strict
```

### Export models

Models can be exported from a given repo (local or remote) to a single file using a JSON Array.

```bash
# Retrieves an interface from a custom repo by DTMI

> dmr-client export --dtmi "dtmi:com:example:Thermostat;1" --repo https://raw.githubusercontent.com/Azure/iot-plugandplay-models/main
```

### Create Index

The model repo can host a `index.json` file with all the `ids` avaialble in the repository. Read the [Index Spec](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Model-Index)

```bash
# Builds a model index for the repository. If models exceed the page limit new page files will be created relative to the root index.

> dmr-client index --local-repo .
```

```bash
# Build a model index with a custom page limit indicating max models per page.

> dmr-client index --local-repo . --page-limit 100
```

### Create Expanded files

```bash
# Expand all models from the root directory of a local models repository following Azure IoT conventions.
# Expanded models are inserted in-place.

> dmr-client expand --local-repo .
```

```bash
# The default --local-repo value is the current directory. Be sure to specifiy the root for --local-repo.

> dmr-client expand
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

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [https://cla.opensource.microsoft.com](https://cla.opensource.microsoft.com)

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
