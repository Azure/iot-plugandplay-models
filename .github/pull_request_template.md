### Thank you for contributing to the IoT Plug and Play Models repository

:memo: Please review this checklist before submission

- [ ] :eyes: The models submitted in this PR follow the [DTDL Naming Guidelines](https://github.com/Azure/iot-plugandplay-models-tools/wiki/DTDL-Naming-Guidelines) for contributing to this repository.
- [ ] 🕵️I have validated the models locally using the [dmr-client](https://github.com/Azure/iot-plugandplay-models-tools/tree/dev/clients/dotnet/Microsoft.IoT.ModelsRepository.CommandLine) command line tool.
- [ ] ❗ I understand once the PR is approved, the models are considered immutable: any edits will require to submit new files.
- [ ] ✨ When creating a new top level `dtmi:namespace`, I have completed the [PR Info Template](#pr-info-template) below.

:zap: PR validation steps are described in the tools [Wiki](https://github.com/Azure/iot-plugandplay-models-tools/wiki/Validation-Pipeline#pr-validation-checks).

## PR Info Template

When submitting models to the repository we ask that you provide as much of the following meta information around your models and related devices as possible. This info will be used to improve the _IoT Plug and Play_ ecosystem.

👇: Please replace the markdown comment examples with your own values.

### Company Info

> Info identifying your company (if applicable).
<!--


Examples:
- Company name
- Company website
- GitHub presence
- Other

-->

### IoT Plug and Play Device Info
> Info identifying your device.

<!--
Examples:
- Product website
- OS & Arch
- SDK used for model implementation
- Other

-->

### Model Submission Goals

> Info related to broader submission goals.  
<!--

Examples:
- Device certification
- Presence in the [Certified Device catalog](https://devicecatalog.azure.com/)
- IoT Central integration
- Custom solution
- Other

-->

### Code Owners & Reserved Names

> Indicates GitHub alias entries to be added to the repo `CODEOWNERS` for the incoming model namespace. The codeowner is expected to be involved in subsequent DTDL model submissions against the same namespace.

<!--

If no alias is specified then we assume the PR submitter is responsible for the namespace.

Examples:
- @ContosoModelNamespaceOwner 1

-->

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
