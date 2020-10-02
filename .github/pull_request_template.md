
This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

Thank you for contributing to the Device Models repository

This checklist is used to make sure that common guidelines for a pull request are followed.

## General Guidelines

- [ ] The pull request **only** contains device model documents?
- [ ] All device models are in JSON-LD format?
- [ ] One device model per file?
- [ ] A `@context` property at the root of the DTDL document specifying the DTDL version ("dtmi:dtdl:context;2")?
- [ ] One `@id` property specified at the root of the DTDL document?
- [ ] The root `@id` is a valid DTMI?
- [ ] The file path follows the naming conventions in `./CONTRIBUTING.md`?
- [ ] The file path is lower case?
- [ ] Any sub-Id is namespaced "under" the root DTMI?
- [ ] Any references to DTMIs can be resolved within **this** repository (either as existing documents or included in this pull request)?

## Special circumstances
### Edits/deletions
- [ ] An issue has been raised using the edits/deletions issue template? Provide issue number:
- [ ] Known consumers impacted by this change have been alerted by external means?
- [ ] Alternative DTMI to avoid a breaking change have been investigated and are not viable?

### Code owner opt-out
- [ ] Long-term support is unknown. This is unusual as most device models should be created by people supporting the devices, device code, or downstream systems.