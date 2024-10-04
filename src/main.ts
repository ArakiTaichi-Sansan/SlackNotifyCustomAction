import * as core from '@actions/core'
import axios from 'axios'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const webhookURL = core.getInput('webhookURL', { required: true })
  const mentionString = core.getInput('mentionString', { required: true })
  const messageTemplate = core.getInput('messageTemplate', { required: true })
  /* テンプレートの中に書かれている${mentionString}という文字列をmentionStringの中身で置き換える.*/
  const fullMessage = messageTemplate.replace('${mentionString}', mentionString)
  try {
    await axios.post(webhookURL, { text: fullMessage })
  } catch (e) {
    console.log('Slackにメッセージを送る際にエラーが発生しました。', e)
  }
  console.log('Slackにテンプレートから作成したメッセージを送りました。')
}
