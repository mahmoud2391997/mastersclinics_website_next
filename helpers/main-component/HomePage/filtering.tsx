import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, MapPin, Building, Users, Loader, Stethoscope, Monitor, Tag, X, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from "next/navigation";

interface Option {
  id: string;
  name: string;
  region_id?: number;
  branch_ids?: number[];
}
interface DropdownComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  icon: React.ComponentType<any>;
  loading?: boolean;
  disabled?: boolean;
  showSelectedFilter?: boolean;
  onRemoveFilter?: () => void;
}
const ArabicSearchForm = () => {
  const router = useRouter();
  const params = useParams<{ entityType?: string; entityId?: string }>();
  const entityType = params?.entityType;
  const entityId = params?.entityId;

  const isDetailView = !!(entityType && entityId);

  
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState({
    regions: [] as Option[],
    branches: [] as Option[],
    departments: [] as Option[]
  });

  const [filteredBranches, setFilteredBranches] = useState<Option[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Option[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);

  // Service type options
  const serviceTypeOptions = [
    { id: '', name: 'جميع الخدمات' },
    { id: 'doctor', name: 'أطباء' },
    { id: 'device', name: 'أجهزة' },
    { id: 'offer', name: 'عروض' }
  ];

  // Check if we're in detail view mode

  // Fetch entity details when in detail view
  useEffect(() => {
    if (isDetailView) {
      fetchEntityDetails(entityType, entityId);
    }
  }, [entityType, entityId]);

  // Fetch available filters on component mount
  useEffect(() => {
    fetchFilters();
  }, []);

  // Filter branches based on selected region
  useEffect(() => {
    if (selectedRegion && filters.branches.length > 0) {
      const filtered = filters.branches.filter(branch => 
        branch.region_id === parseInt(selectedRegion)
      );
      setFilteredBranches(filtered);
      if (selectedBranch && !filtered.some(b => b.id === selectedBranch)) {
        setSelectedBranch('');
      }
    } else {
      setFilteredBranches(filters.branches);
    }
  }, [selectedRegion, filters.branches, selectedBranch]);

  // Filter departments based on selected branch
  useEffect(() => {
    if (selectedBranch && filters.departments.length > 0) {
      const selectedBranchData = filters.branches.find(b => b.id === selectedBranch);
      if (selectedBranchData && selectedBranchData.branch_ids) {
        const branchDeptIds = selectedBranchData.branch_ids.map(id => id.toString());
        const filtered = filters.departments.filter(dept => 
          dept.branch_ids && dept.branch_ids.some((id: number) => branchDeptIds.includes(id.toString()))
        );
        setFilteredDepartments(filtered);
        if (selectedDepartment && !filtered.some(d => d.id === selectedDepartment)) {
          setSelectedDepartment('');
        }
      } else {
        setFilteredDepartments(filters.departments);
      }
    } else {
      setFilteredDepartments(filters.departments);
    }
  }, [selectedBranch, filters.departments, filters.branches, selectedDepartment]);

  // Search function
  const performSearch = useCallback(async () => {
    if (!selectedServiceType) return;
    
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams();
      if (selectedRegion) params.append('regionId', selectedRegion);
      if (selectedBranch) params.append('branchId', selectedBranch);
      if (selectedDepartment) params.append('departmentId', selectedDepartment);
      if (selectedServiceType) params.append('serviceType', selectedServiceType);
      
      const response = await fetch(`https://www.ss.mastersclinics.com/api/search?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('فشل في البحث، يرجى المحاولة مرة أخرى');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedRegion, selectedBranch, selectedDepartment, selectedServiceType]);

  // Trigger search when service type is selected
  useEffect(() => {
    if (selectedServiceType) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [selectedServiceType, performSearch]);

  const fetchFilters = async () => {
    try {
      setLoading(true);

      const [regionsRes, branchesRes, departmentsRes] = await Promise.all([
        fetch("https://www.ss.mastersclinics.com/regions"),
        fetch("https://www.ss.mastersclinics.com/branches"),
        fetch("https://www.ss.mastersclinics.com/departments"),
      ]);

      if (!regionsRes.ok || !branchesRes.ok || !departmentsRes.ok) {
        throw new Error("Failed to fetch one or more filters");
      }

      const [regionsData, branchesData, departmentsData] = await Promise.all([
        regionsRes.json(),
        branchesRes.json(),
        departmentsRes.json(),
      ]);

      setFilters({
        regions: regionsData,
        branches: branchesData,
        departments: departmentsData,
      });
      setFilteredBranches(branchesData);
      setFilteredDepartments(departmentsData);
    } catch (err) {
      setError('فشل في تحميل خيارات البحث');
      console.error('Error fetching filters:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntityDetails = async (type: string, id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.ss.mastersclinics.com/api/${type}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch entity details');
      
      const data = await response.json();
      setSelectedEntity(data);
    } catch (err) {
      setError('فشل في تحميل التفاصيل');
      console.error('Error fetching entity details:', err);
    } finally {
      setLoading(false);
    }
  };

const navigateToEntity = (type: string, id: string) => {
  // pluralize type
  const pluralType = type.endsWith('s') ? type : `${type}s`;
  router.push(`/${pluralType}/${id}`);
};


  const navigateBackToSearch = () => {
    router.push('/');
    setSelectedEntity(null);
  };

  // Determine which filter to remove next (latest first)
  const getNextFilterToRemove = () => {
    if (selectedServiceType) return 'serviceType';
    if (selectedDepartment) return 'department';
    if (selectedBranch) return 'branch';
    if (selectedRegion) return 'region';
    return null;
  };

  // Remove the latest filter
  const removeLatestFilter = () => {
    const filterToRemove = getNextFilterToRemove();
    
    switch (filterToRemove) {
      case 'serviceType':
        setSelectedServiceType('');
        break;
      case 'department':
        setSelectedDepartment('');
        break;
      case 'branch':
        setSelectedBranch('');
        break;
      case 'region':
        setSelectedRegion('');
        break;
      default:
        break;
    }
  };

  // Check if a filter can be removed (only the latest can be removed)
  const canRemoveFilter = (filterType: string) => {
    const nextToRemove = getNextFilterToRemove();
    return nextToRemove === filterType;
  };

  const DropdownComponent: React.FC<DropdownComponentProps> = ({ 
    value, 
    onChange, 
    options, 
    placeholder, 
    icon: Icon,
    loading = false,
    disabled = false,
    showSelectedFilter = false,
    onRemoveFilter
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectedOption = options.find((opt: Option) => opt.id === value);

    return (
      <div className="relative w-full ">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-right flex items-center justify-between hover:border-red-400 focus:border-red-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            {loading ? (
              <Loader className="w-4 h-4 text-gray-500 animate-spin" />
            ) : (
              <>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <Icon className="w-4 h-4 text-gray-500" />
              </>
            )}
          </div>
          <span className="text-gray-700 font-medium">
            {selectedOption?.name || placeholder}
          </span>
        </button>

        {isOpen && !loading && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option: Option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right hover:bg-[#CBA853] hover:text-white transition-colors border-b border-gray-100 last:border-b-0 "
              >
                {option.name}
              </button>
            ))}
          </div>
        )}

        {/* Selected filter display below dropdown */}
        {showSelectedFilter && selectedOption && (
          <div className="mt-2 w-full bg-gray-100 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{selectedOption.name}</span>
            <button 
              onClick={onRemoveFilter}
              className="text-gray-500 hover:text-red-500 transition-colors"
              disabled={!canRemoveFilter(placeholder.includes('المنطقة') ? 'region' : 
                         placeholder.includes('الفرع') ? 'branch' : 
                         placeholder.includes('القسم') ? 'department' : 
                         'serviceType')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'doctor': return Stethoscope;
      case 'device': return Monitor;
      case 'offer': return Tag;
      default: return Users;
    }
  };

  const getResultTitle = () => {
    switch (selectedServiceType) {
      case 'doctor': return 'الأطباء';
      case 'device': return 'الأجهزة';
      case 'offer': return 'العروض';
      default: return 'نتائج البحث';
    }
  };

  const ResultCard = ({ item, type }: { item: any; type: string }) => {
    return (
      <div 
        className="bg-white rounded-lg shadow-md p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigateToEntity(type, item.id)}
      >
        <h4 className="font-semibold text-lg text-right mb-2">{item.name || item.title}</h4>
        {item.description && (
          <p className="text-gray-600 text-right text-sm mb-2 line-clamp-2">{item.description}</p>
        )}
        {item.type && (
          <p className="text-gray-500 text-right text-sm mb-2">النوع: {item.type}</p>
        )}
        {item.specialty && (
          <p className="text-gray-500 text-right text-sm mb-2">التخصص: {item.specialty}</p>
        )}
        {item.priceAfter && (
          <p className="text-green-600 font-bold text-right">
            السعر: {item.priceAfter} ر.س
            {item.priceBefore && (
              <span className="text-gray-400 line-through text-sm mr-2">
                {item.priceBefore} ر.س
              </span>
            )}
          </p>
        )}
      </div>
    );
  };

  const EntityDetailView = () => {
    if (!selectedEntity) return null;
    
    return (
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
        <button 
          onClick={navigateBackToSearch}
          className="flex items-center text-red-500 mb-6"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          العودة إلى نتائج البحث
        </button>
        
        <h2 className="text-2xl font-bold text-right mb-4">{selectedEntity.name || selectedEntity.title}</h2>
        
        {selectedEntity.description && (
          <p className="text-gray-600 text-right mb-4">{selectedEntity.description}</p>
        )}
        
        {selectedEntity.specialty && (
          <p className="text-gray-500 text-right mb-2">التخصص: {selectedEntity.specialty}</p>
        )}
        
        {selectedEntity.priceAfter && (
          <p className="text-green-600 font-bold text-right text-xl">
            السعر: {selectedEntity.priceAfter} ر.س
            {selectedEntity.priceBefore && (
              <span className="text-gray-400 line-through text-lg mr-2">
                {selectedEntity.priceBefore} ر.س
              </span>
            )}
          </p>
        )}
        
        {/* Add more details as needed based on your API response */}
      </div>
    );
  };

  return (
    <div className="p-6 bg-[#f6eecd]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Show back button if in detail view */}
        {isDetailView && (
          <button 
            onClick={navigateBackToSearch}
            className="flex items-center text-red-500 mb-6"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة إلى البحث
          </button>
        )}
        
        {/* Show search form only if not in detail view */}
        {!isDetailView && (
          <>
            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {/* Region Dropdown */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    المنطقة
                  </label>
                  <DropdownComponent
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    options={filters.regions}
                    placeholder="اختر المنطقة"
                    icon={MapPin}
                    loading={loading}
                    showSelectedFilter={!!selectedRegion}
                    onRemoveFilter={() => setSelectedRegion('')}
                  />
                </div>

                {/* Branch Dropdown */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    الفرع
                  </label>
                  <DropdownComponent
                    value={selectedBranch}
                    onChange={setSelectedBranch}
                    options={filteredBranches}
                    placeholder="اختر الفرع"
                    icon={Building}
                    loading={loading}
                    disabled={!selectedRegion}
                    showSelectedFilter={!!selectedBranch}
                    onRemoveFilter={() => setSelectedBranch('')}
                  />
                </div>

                {/* Department Dropdown */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    القسم
                  </label>
                  <DropdownComponent
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    options={filteredDepartments}
                    placeholder="اختر القسم"
                    icon={Users}
                    loading={loading}
                    disabled={!selectedBranch}
                    showSelectedFilter={!!selectedDepartment}
                    onRemoveFilter={() => setSelectedDepartment('')}
                  />
                </div>

                {/* Service Type Dropdown */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    نوع الخدمة
                  </label>
                  <DropdownComponent
                    value={selectedServiceType}
                    onChange={setSelectedServiceType}
                    options={serviceTypeOptions}
                    placeholder="اختر نوع الخدمة"
                    icon={getServiceTypeIcon(selectedServiceType)}
                    loading={loading}
                    disabled={!selectedDepartment}
                    showSelectedFilter={!!selectedServiceType}
                    onRemoveFilter={() => setSelectedServiceType('')}
                  />
                </div>
              </div>

              {/* Remove latest filter button */}
              {getNextFilterToRemove() && (
                <div className="mt-4 text-left">
                  <button
                    onClick={removeLatestFilter}
                    className="text-red-500 text-sm flex items-center"
                  >
                    <X className="w-4 h-4 ml-1" />
                    إزالة آخر عامل تصفية
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-right">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="mt-8 text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto text-red-500" />
                <p className="text-gray-600 mt-2">جاري البحث...</p>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && !loading && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                  {getResultTitle()}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((item, index) => (
                    <ResultCard key={index} item={item} type={selectedServiceType} />
                  ))}
                </div>
              </div>
            )}

            {/* No results message */}
            {searchResults.length === 0 && selectedServiceType && !loading && (
              <div className="text-center py-12 mt-8">
                <p className="text-gray-500 text-lg">لم يتم العثور على نتائج</p>
                <p className="text-gray-400">حاول تغيير معايير البحث</p>
              </div>
            )}
          </>
        )}

        {/* Show entity detail view when in detail mode */}
        {isDetailView && <EntityDetailView />}
      </div>
    </div>
  );
};

export default ArabicSearchForm;