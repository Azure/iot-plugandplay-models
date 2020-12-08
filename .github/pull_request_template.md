### Thank you for contributing to the Azure IoT Plug and Play Models repository

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

The repository pipeline will ensure minimum validation of incoming DTDL models.  

- PR validation steps are described in the tools [Wiki](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Validation-Pipeline#pr-validation-checks).
- The same validation can be run locally via the [dmr-client](https://github.com/Azure/iot-plugandplay-models-tools/tree/dev/clients/dotnet#device-model-repository-client) CLI.

## Requested info template for model(s) submission

When submitting models to the repository we ask that you provide as much of the following meta information around your models and related devices as possible. This info will be used to improve Plug and Play.

:star2: Please replace the markdown comment examples with your own values.

### Company Info

<!--
> Info identifying your company (if applicable).

Examples:
- Company name
- Company website
- GitHub presence
- Other

-->

### PnP Device Info

<!--
> Info identifying your PnP device.

Examples:
- Product website
- OS & Arch
- SDK used for model implementation
- Other

-->

### Model Submission Goals

<!--
> Info related to broader PnP goals.  

Examples:
- Device certification
- Presence in the [Certified Device catalog](https://devicecatalog.azure.com/)
- IoT Central integration
- Custom solution
- Other

-->

### Code Owners & Reserved Names

<!--
> Indicates GitHub alias entries to be added to the repo `CODEOWNERS` for the incoming model namespace. The codeowner is expected to be involved in subsequent DTDL model submissions against the same namespace.

If no alias is specified then we assume the PR submitter is responsible for the namespace.

Examples:
- @ContosoModelNamespaceOwner 1

-->
