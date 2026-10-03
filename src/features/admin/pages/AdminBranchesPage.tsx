import React, { useState, useMemo } from "react";
import {
  MapPin,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  Building2,
  Phone,
  CheckCircle2,
  X,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Branch } from "../../../data/branches";

export const AdminBranchesPage: React.FC = () => {
  const { branches, addBranch, updateBranch, deleteBranch, resetBranches } =
    useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCity, setFormCity] = useState("Hà Nội");
  const [formArea, setFormArea] = useState("");
  const [formAddress, setFormAddress] = useState("");

  const cities = useMemo(() => {
    const set = new Set<string>();
    branches.forEach((b) => set.add(b.city));
    return ["ALL", ...Array.from(set)];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCity = selectedCity === "ALL" || b.city === selectedCity;
      return matchSearch && matchCity;
    });
  }, [branches, searchTerm, selectedCity]);

  // City Breakdown counts
  const cityCounts = useMemo(() => {
    const hanoi = branches.filter((b) => b.city === "Hà Nội").length;
    const hcm = branches.filter((b) => b.city === "TP. Hồ Chí Minh").length;
    const other = branches.length - hanoi - hcm;
    return { hanoi, hcm, other };
  }, [branches]);

  const handleOpenCreateModal = () => {
    setEditingBranch(null);
    setFormName("Photo Palette - ");
    setFormCity("Hà Nội");
    setFormArea("");
    setFormAddress("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setFormName(branch.name);
    setFormCity(branch.city);
    setFormArea(branch.area);
    setFormAddress(branch.address);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddress.trim()) {
      alert("Vui lòng điền đầy đủ tên và địa chỉ chi nhánh!");
      return;
    }

    if (editingBranch) {
      updateBranch(editingBranch.id, {
        name: formName,
        city: formCity,
        area: formArea,
        address: formAddress,
      });
    } else {
      addBranch({
        name: formName,
        city: formCity,
        area: formArea,
        address: formAddress,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (branch: Branch) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa chi nhánh "${branch.name}"? Dữ liệu trang Giới thiệu sẽ được cập nhật ngay.`
      )
    ) {
      deleteBranch(branch.id);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn khôi phục danh sách về 24 chi nhánh gốc mặc định?"
      )
    ) {
      resetBranches();
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Quản Lý Chi Nhánh Studio ({branches.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống phòng chụp toàn quốc hiển thị tại trang Giới Thiệu & Bản Đồ Chi Nhánh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="Khôi phục danh sách chi nhánh mặc định"
          >
            <RotateCcw size={14} /> Khôi Phục Gốc
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} /> Thêm Chi Nhánh
          </button>
        </div>
      </div>

      {/* 2. City Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Hà Nội</div>
            <div className="text-2xl font-black text-slate-800 mt-0.5">{cityCounts.hanoi} cơ sở</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center font-bold">
            HN
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">TP. Hồ Chí Minh</div>
            <div className="text-2xl font-black text-slate-800 mt-0.5">{cityCounts.hcm} cơ sở</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
            HCM
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Tỉnh Thành Khác</div>
            <div className="text-2xl font-black text-slate-800 mt-0.5">{cityCounts.other} cơ sở</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center font-bold">
            PROV
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm theo tên chi nhánh, địa chỉ hoặc quận..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">
            Tỉnh / TP:
          </span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "ALL" ? "Tất cả tỉnh thành" : city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Branches Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-4 px-6 w-16">ID</th>
                <th className="py-4 px-6">Tên Chi Nhánh</th>
                <th className="py-4 px-4">Tỉnh / Thành Phố</th>
                <th className="py-4 px-4">Khu Vực</th>
                <th className="py-4 px-6">Địa Chỉ Chi Tiết</th>
                <th className="py-4 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBranches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Không tìm thấy chi nhánh nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredBranches.map((branch) => (
                  <tr
                    key={branch.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-bold text-slate-400 font-mono">
                      #{branch.id}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900 text-sm">
                        {branch.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        Đang hoạt động
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {branch.city}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {branch.area}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin size={14} className="text-brand-400 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(branch)}
                          className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                          title="Chỉnh sửa chi nhánh"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(branch)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Xóa chi nhánh"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL: CREATE / EDIT BRANCH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                  <Building2 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {editingBranch ? "Sửa Thông Tin Chi Nhánh" : "Thêm Chi Nhánh Mới"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Cập nhật vị trí phòng chụp cho khách hàng
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên Chi Nhánh *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Photo Palette - Hoàn Kiếm"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tỉnh / Thành Phố *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hà Nội, TP. Hồ Chí Minh..."
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Khu Vực / Quận
                  </label>
                  <input
                    type="text"
                    placeholder="Hoàn Kiếm, Cầu Giấy..."
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Địa Chỉ Cụ Thể *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Số nhà, tên đường, phường..."
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all cursor-pointer"
                >
                  {editingBranch ? "Lưu Thay Đổi" : "Tạo Chi Nhánh"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
