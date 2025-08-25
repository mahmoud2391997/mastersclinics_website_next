// export const PaymentStatusModal = ({ sessionId, isOpen, onClose }) => {
//   const { status, loading, error } = usePaymentStatus(sessionId);
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'paid') {
//       // Auto-close and redirect after successful payment
//       setTimeout(() => {
//         onClose();
//         router.push("/thankyou");
//       }, 2000);
//     }
//   }, [status, onClose, router]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl p-6 max-w-md w-full">
//         <div className="text-center">
//           {loading ? (
//             <>
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <h3 className="text-lg font-semibold mb-2">جاري التحقق من حالة الدفع</h3>
//               <p>يرجى الانتظار...</p>
//             </>
//           ) : error ? (
//             <>
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <h3 className="text-lg font-semibold mb-2">خطأ في التحقق</h3>
//               <p className="text-gray-600 mb-4">{error}</p>
//               <button 
//                 onClick={onClose}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 إغلاق
//               </button>
//             </>
//           ) : (
//             <>
//               <div className={`text-4xl mb-4 ${
//                 status === 'paid' ? 'text-green-500' : 
//                 status === 'failed' ? 'text-red-500' : 'text-yellow-500'
//               }`}>
//                 {status === 'paid' ? '✅' : 
//                  status === 'failed' ? '❌' : '⏳'}
//               </div>
//               <h3 className="text-lg font-semibold mb-2">
//                 {status === 'paid' ? 'تم الدفع بنجاح!' : 
//                  status === 'pending' ? 'قيد المعالجة' : 
//                  status === 'failed' ? 'فشل في الدفع' : 'حالة غير معروفة'}
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 {status === 'paid' ? 'شكراً لك على الدفع. جاري توجيهك إلى صفحة التأكيد...' : 
//                  status === 'pending' ? 'يتم الآن معالجة طلب الدفع الخاص بك. قد تستغرق العملية بضع دقائق.' : 
//                  status === 'failed' ? 'عذراً، لم نتمكن من معالجة الدفع. يرجى المحاولة مرة أخرى.' : 
//                  'حالة الدفع غير معروفة.'}
//               </p>
//               {status === 'paid' && (
//                 <div className="animate-pulse">جاري التوجيه...</div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
