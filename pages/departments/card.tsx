import Link from 'next/link';
 interface Branch {
  id: number;
  name: string;
}

interface DepartmentStat {
  id: number;
  name: string;
  description: string;
  image?: string;
  branch_ids?: number[] | string;
}
interface DepartmentsGridProps {
  departments: DepartmentStat[];
  branches: Branch[];
}

export function DepartmentsGrid({ departments, branches }: DepartmentsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <DepartmentCard 
          key={department.id}
          department={department}
          branches={branches}
        />
      ))}
    </div>
  );
}

interface DepartmentCardProps {
  department: DepartmentStat;
  branches: Branch[];
}

function DepartmentCard({ department, branches }: DepartmentCardProps) {
  // Handle branch_ids that might be string or array
  const departmentBranches = department.branch_ids 
    ? typeof department.branch_ids === 'string'
      ? JSON.parse(department.branch_ids) as number[]
      : department.branch_ids
    : [];
    
  const branchInfo = branches.filter(b => departmentBranches.includes(b.id));
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" dir='rtl'>
      {department.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={department.image} 
            alt={department.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{department.name}</h3>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{department.description}</p>
        
        {branchInfo.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Available at:</h4>
            <div className="flex flex-wrap gap-1">
              {branchInfo.slice(0, 3).map(branch => (
                <span key={branch.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {branch.name}
                </span>
              ))}
              {branchInfo.length > 3 && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  +{branchInfo.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <Link href={`/departments/${department.id}`}>
          <a className="text-blue-600 hover:text-blue-800 font-medium">
            View Details →
          </a>
        </Link>
      </div>
    </div>
  );
}
export default DepartmentCard;
