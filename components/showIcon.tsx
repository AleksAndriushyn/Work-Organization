import Epic16Icon from '@atlaskit/icon-object/glyph/epic/16'
import Subtask16Icon from '@atlaskit/icon-object/glyph/subtask/16'
import Task16Icon from '@atlaskit/icon-object/glyph/task/16'

const showIcon = (type: string) => {
  switch (type) {
    case 'Epic':
      return <Epic16Icon label="" />
    case 'Task':
      return <Task16Icon label="" />
    case 'Subtask':
      return <Subtask16Icon label="" />
  }
}

export default showIcon
