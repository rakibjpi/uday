// ===== Demo =====

import { motion } from "motion/react";
import {
  AlertModal,
  ConfirmModal,
  Modal,
  ModalBody,
  ModalFooter,
} from "./Model";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
} from "lucide-react";
import { useState } from "react";

export default function ModalDemo() {
  const [modals, setModals] = useState({
    basic: false,
    alert: false,
    confirm: false,
    drawer: false,
    fullscreen: false,
    loading: false,
    success: false,
    warning: false,
    large: false,
  });

  const toggle = (key: keyof typeof modals) =>
    setModals((m) => ({ ...m, [key]: !m[key] }));

  const handleConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toggle("confirm");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Advanced Modal Component
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Built with Motion (Framer Motion) • React Router optimized • Fully
            accessible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              key: "basic",
              title: "Basic Modal",
              desc: "Standard with animations",
              color: "blue",
              icon: Info,
            },
            {
              key: "success",
              title: "Success Alert",
              desc: "With icon styling",
              color: "green",
              icon: CheckCircle,
            },
            {
              key: "confirm",
              title: "Confirm Dialog",
              desc: "Async confirmation",
              color: "red",
              icon: AlertCircle,
            },
            {
              key: "alert",
              title: "Info Alert",
              desc: "Information modal",
              color: "cyan",
              icon: Info,
            },
            {
              key: "drawer",
              title: "Drawer Panel",
              desc: "Slides from right",
              color: "purple",
              icon: null,
            },
            {
              key: "fullscreen",
              title: "Fullscreen",
              desc: "Takes full screen",
              color: "pink",
              icon: null,
            },
            {
              key: "loading",
              title: "Loading State",
              desc: "With overlay",
              color: "gray",
              icon: Loader2,
            },
            {
              key: "warning",
              title: "Warning",
              desc: "Warning message",
              color: "orange",
              icon: AlertTriangle,
            },
            {
              key: "large",
              title: "Large Content",
              desc: "Scrollable",
              color: "indigo",
              icon: null,
            },
          ].map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
              onClick={() => toggle(item.key as keyof typeof modals)}
            >
              <div
                className={`w-12 h-12 bg-${item.color}-100 text-${item.color}-600 rounded-lg flex items-center justify-center mb-4`}
              >
                {item.icon && <item.icon className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
              <div
                className={`w-full px-4 py-2.5 bg-${item.color}-600 text-white rounded-lg text-center font-medium`}
              >
                Open
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modals */}
        <Modal
          isOpen={modals.basic}
          onClose={() => toggle("basic")}
          title="Welcome!"
          description="Smooth Motion animations"
          size="md"
        >
          <ModalBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                Modal with smooth animations using Motion (Framer Motion)
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                <li>Spring physics animations</li>
                <li>Keyboard navigation</li>
                <li>React Router integrated</li>
              </ul>
            </div>
          </ModalBody>
          <ModalFooter align="right">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle("basic")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle("basic")}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Got it!
            </motion.button>
          </ModalFooter>
        </Modal>

        <AlertModal
          isOpen={modals.alert}
          onClose={() => toggle("alert")}
          title="Information"
          message="Informational message with smooth animations"
          type="info"
        />
        <AlertModal
          isOpen={modals.success}
          onClose={() => toggle("success")}
          title="Success!"
          message="Changes saved successfully!"
          type="success"
        />
        <AlertModal
          isOpen={modals.warning}
          onClose={() => toggle("warning")}
          title="Warning"
          message="Please review before proceeding"
          type="warning"
        />
        <ConfirmModal
          isOpen={modals.confirm}
          onClose={() => toggle("confirm")}
          onConfirm={handleConfirm}
          title="Delete Item?"
          message="This action cannot be undone"
          variant="error"
          confirmText="Delete"
        />

        <Modal
          isOpen={modals.drawer}
          onClose={() => toggle("drawer")}
          variant="drawer"
          title="Settings"
          animation="slide"
        >
          <ModalBody>
            <div className="space-y-4">
              <p className="text-gray-700">
                Drawer panel with spring animation
              </p>
              {["Spring physics", "Full height", "Smooth slide"].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">{f}</span>
                </motion.div>
              ))}
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modals.fullscreen}
          onClose={() => toggle("fullscreen")}
          variant="fullscreen"
          title="Fullscreen"
          animation="zoom"
        >
          <ModalBody>
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Fullscreen Modal</h2>
                <p className="text-gray-600 mb-8">
                  Perfect for immersive experiences
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle("fullscreen")}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium"
                >
                  Exit
                </motion.button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modals.loading}
          onClose={() => toggle("loading")}
          title="Processing"
          loading={true}
          size="sm"
        >
          <ModalBody>
            <p className="text-gray-700">Loading state prevents interaction</p>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modals.large}
          onClose={() => toggle("large")}
          title="Terms"
          size="xl"
          animation="slideUp"
          header={{
            divider: true,
          }}
        >
          <ModalBody>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">
                    {i}. Section {i}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                  </p>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter align="between" divider={true}>
            <button
              onClick={() => toggle("large")}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Decline
            </button>
            <button
              onClick={() => toggle("large")}
              className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
            >
              Accept
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
