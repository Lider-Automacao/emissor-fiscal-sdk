
import fs, { existsSync, mkdirSync, unlinkSync } from 'fs'
import { Environments } from './config/environments'

export const SaveJsonLog = (name: string, data: any) => {
  if (Environments.logAtivo) {
    return
  }

  try {
    const folder = `logs/json`
    const filePath = `${folder}/${name}.json`

    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true })
    }

    if (existsSync(filePath)) {
      unlinkSync(filePath)
    }

    const logger = fs.createWriteStream(filePath, {
      flags: 'a',
    })

    logger.write(JSON.stringify(data, null, 2))

    logger.end()
  } catch (error) {
    console.error(error)
  }
}

export const SaveJsonLogWithDateTime = (name: string, data: any) => {
  if (Environments.logAtivo) {
    return
  }

  const nameWithDate =
    name + '_' + new Date().toISOString().replace(/[^0-9]/gi, '')
  SaveJsonLog(nameWithDate, data)
}
