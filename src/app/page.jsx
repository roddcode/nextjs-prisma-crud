import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function loadTasks() {
  const tasks = await prisma.task.findMany()
  return tasks
}
async function HomePage() {
  const tasks = await loadTasks()
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
      {tasks.map(task => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
    </section>
  )
}

export default HomePage