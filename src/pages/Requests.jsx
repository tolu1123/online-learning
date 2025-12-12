import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { RequestCard } from "../components/features/RequestCard";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router";
export default function Requests() {
  const [filter, setFilter] = useState("")
  // Mock data
  const requests = [
    {
      topic: "Linear Algebra: Eigenvalues",
      subject: "Mathematics",
      description:
        "I'm struggling to understand how to calculate eigenvalues for 3x3 matrices. Need help preparing for finals.",
      status: "Open",
      student: "Alex M.",
      date: "2 hours ago",
    },
    {
      topic: "React Context API",
      subject: "Computer Science",
      description:
        "Need someone to explain when to use Context vs Redux. I have a project due next week.",
      status: "Open",
      student: "Sarah J.",
      date: "4 hours ago",
    },
    {
      topic: "Thermodynamics Laws",
      subject: "Physics",
      description:
        "Confused about the second law of thermodynamics and entropy calculations.",
      status: "In Progress",
      student: "Mike T.",
      date: "1 day ago",
    },
    {
      topic: "Macroeconomics Supply/Demand",
      subject: "Economics",
      description: "Need help graphing supply and demand shifts.",
      status: "Completed",
      student: "Emily R.",
      date: "2 days ago",
    },
  ];
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Help Requests</h1>
            <p className='text-gray-500'>
              Find students to help or request assistance for yourself.
            </p>
          </div>
          <Button asChild className='gap-2'>
            <Link to="/create-request">
              <Plus className='h-4 w-4' /> New Request
            </Link>
          </Button>
        </div>


        <div className='space-y-6'>
          <div className='flex items-center gap-4 overflow-x-auto pb-2'>
            <Button onClick={() => setFilter("")} variant={filter === "" ? 'secondary': 'ghost'} size='sm' className='whitespace-nowrap'>
              All Requests
            </Button>
            <Button onClick={() => setFilter("Open")} variant={filter === "Open" ? 'secondary': 'ghost'} size='sm' className='whitespace-nowrap'>
              Open
            </Button>
            <Button onClick={() => setFilter("In Progress")} variant={filter === "In Progress" ? 'secondary': 'ghost'} size='sm' className='whitespace-nowrap'>
              In Progress
            </Button>
            <Button onClick={() => setFilter("Completed")} variant={filter === "Completed" ? 'secondary': 'ghost'} size='sm' className='whitespace-nowrap'>
              Completed
            </Button>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {requests.filter(ele => ele.status.includes(filter)).map((req, i) => (
              <RequestCard key={i} {...req} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
