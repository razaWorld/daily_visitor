interface Visitor {
  id: number
  name: string
  purpose: string
}

export default function Visitors() {
  const visitors: Visitor[] = [
    { id: 1, name: "Ali", purpose: "Meeting" },
    { id: 2, name: "Ahmed", purpose: "Delivery" }
  ]

  return (
    <div>
      {visitors.map((visitor,index) => (
        <div key={visitor.id}>
          <h2>{visitor.name}{index}</h2>
          <p>{visitor.purpose}</p>
        </div>
      ))}
    </div>
  )
}
