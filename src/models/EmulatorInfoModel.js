/**
 * EmulatorInfo data model
 */
export const EmulatorInfoModel = {
    // Data model
    dir: undefined,
    key: undefined,
    uuid: undefined,
    name: undefined,
    isRunning: undefined,
    // Parse obj form string
    parse: function(json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'EmulatorInfo') {
            return undefined
        }
        return {
            dir: data['jsonData']['model']['dir'],
            key: data['jsonData']['model']['key'],
            uuid: data['jsonData']['model']['uuid'],
            name: data['jsonData']['model']['name'],
            isRunning: data['jsonData']['model']['is_running'],
        }
    }
}
