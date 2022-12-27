import { Project } from '../pages/companies/Companies'

const ProjectTable = ({
  projects,
  setProjects,
}: {
  projects: Project[]
  setProjects: Function
}) => {
  const onDeleteProject = async (id: string) => {
    const resp = await fetch('/api/deleteProject', {
      method: 'DELETE',
      body: JSON.stringify(id),
    })

    setProjects(projects.filter((el) => el.id !== id))
    return await resp.json()
  }

  return (
    <div
      style={{
        width: '100px',
        marginTop: '10px',
      }}
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: Project) => (
            <tr key={`${project.id}`}>
              <td>{project.name}</td>
              <td>
                <button
                  type="submit"
                  onClick={async () => await onDeleteProject(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ProjectTable
