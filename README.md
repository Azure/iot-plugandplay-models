
# Azure/iot-plugandplay-models repository

This repository includes [DTDL](https://aka.ms/dtdl) models that are made publicly available on [https://devicemodels.azure.com](https://devicemodels.azure.com). These models can be used to create Azure [IoT Plug and Play](https://aka.ms/iotpnp) solutions.

Related tools, samples, and specs can be found in the [Azure/iot-plugandplay-models-tools](https://github.com/Azure/iot-plugandplay-models-tools) repo. The current repo only stores DTDL models.

## Submit a model

1. Fork the public GitHub repo: [https://github.com/Azure/iot-plugandplay-models](https://github.com/Azure/iot-plugandplay-models).
1. Clone the forked repo. Optionally create a new branch to keep your changes isolated from the `main` branch.
1. Add the new interfaces to the `dtmi` folder using the folder/filename convention. See the [add-models](#add-models) tool below.
1. Validate the models locally using the [scripts to validate changes](#validate-files) section.
1. Commit the changes locally and push to your fork.
1. From your fork, create a PR that targets the `main` branch. See [Creating an issue or pull request](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/creating-an-issue-or-pull-request) docs.
1. Review the [PR requirements](pr-reqs.md)

The PR triggers a series of GitHub actions that will validate the new submitted interfaces, and make sure your PR satisfies all the checks.

Microsoft will respond to a PR with all checks in 3 business days.

## Tools

The repo contains scripts to help managing the repo, with tools to add and valdidate files locally.

> Note: These scripts require NodeJs. Don't forget to initialize the dependencies with:

```cmd
npm install
```

### add-models

If you have your model already stored in json files, you can use the add-model script to add those to the `dtmi/` folder with the right file name.

```cmd
npm run add-model <path-to-dtdl.json>
```

Watch the console output for any error messages.

### validate-files

Checks the folder and file names are expected from the root `@id`

```cmd
npm run validate-files <list of files to validate>
```

> Note you can validate more that one file by providing a list of files separated by a white space

### validate-ids

Checks if all `@id` are nested under the root id.

```cmd
npm run validate-ids <list of files to validate>
```

> Note you can validate more that one file by providing a list of files separated by a white space

### validate-deps

Checks if all the external dependencies in `extends` and `@Component` exists in the `dtmi/` folder.

```cmd
npm run validate-deps <list of files to validate>
```

> Note you can validate more that one file by providing a list of files separated by a white space

### validate-models

Checks if the models can be successfully validated by the .NET DTDL parser.

You can run the [DTDL Validation Sample](https://github.com/Azure-Samples/DTDL-Validator) to validate your models locally

## Consuming

Any HTTP client can consume the models by just applying the [convention](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Resolution-Convention) to translate *DTMI ids* to relative paths:

Eg, the interface:

```cmd
dtmi:azure:DeviceManagement:DeviceInformation;1
```

can be retrieved from [here](https://devicemodels.azure.com/dtmi/azure/devicemanagement/deviceinformation-1.json):

```cmd
https://devicemodels.azure.com/dtmi/azure/devicemanagement/deviceinformation-1.json
```

There are samples for .NET and Node in the [Azure/iot-plugandplay-models-tools](https://github.com/Azure/iot-plugandplay-models-tools) with code you can use to acquire models from your custom IoT solution.

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
