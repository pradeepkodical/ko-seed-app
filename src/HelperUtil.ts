import * as ko from 'knockout';

export class HelperUtil {
    static register(componentName: string, config: ko.components.Config | object) {
        if (!ko.components.isRegistered(componentName)) {
            ko.components.register(componentName, config);
        }
    }

    static registerPage(pageComponentName: string, config: ko.components.Config | object) {
        const id = `tpl${pageComponentName.split('-').join('')}`;
        if (!ko.components.isRegistered(pageComponentName)) {
            ko.components.register(pageComponentName, config);
            $('body').append(`<template id="${id}"><${pageComponentName} params="data: {url: $root.url, screenWidth: $root.screenWidth}"></${pageComponentName}></template>`);
        }
        return id;
    }
}