/**
 * AppInfo data model
 */
export const AppInfoModel = {
    // Data model
    appVersion: undefined,
    apiVersion: undefined,
    // Parse obj form string
    parse: function(json) {
        let data = JSON.parse(json);
        if (data['key'] !== 'AppInfo') {
            return undefined
        }
        return {
            appVersion: data['jsonData']['version'],
            apiVersion: data['jsonData']['api_version'],
        }
    }
}
