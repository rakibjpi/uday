import React from "react";
import Button from "./Button";
import { Trash, CirclePlus, HomeIcon } from "lucide-react";

export default function ButtonExample() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Button & Image Components
          </h1>
          <p className="text-gray-600 mb-8">
            Comprehensive demo of all features
          </p>

          <div className="space-y-10">
            {/* Variants */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Variants
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button title="Primary" variant="primary" />
                <Button title="Secondary" variant="secondary" />
                <Button title="Danger" variant="danger" />
                <Button title="Success" variant="success" />
                <Button title="Inline Link" variant="inline" />
              </div>
            </section>

            {/* Sizes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Sizes
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <Button title="Small" size="sm" />
                <Button title="Medium" size="md" />
                <Button title="Large" size="lg" />
              </div>
            </section>

            {/* With Icons */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                With Icons
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button title="Home" icon={HomeIcon} variant="primary" />
                <Button title="Delete" icon={Trash} variant="danger" />
                <Button title="Add Item" icon={CirclePlus} variant="success" />
                <Button
                  title="Settings"
                  icon={HomeIcon}
                  variant="secondary"
                  size="sm"
                />
              </div>
            </section>

            {/* With Images */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                With Images
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  title="Google"
                  imageSrc="https://www.google.com/favicon.ico"
                  variant="primary"
                />
                <Button
                  title="GitHub"
                  imageSrc="https://github.com/favicon.ico"
                  variant="secondary"
                  size="lg"
                />
              </div>
            </section>

            {/* Interactive */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Interactive Example
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg mb-4">
                  Count:{" "}
                  <span className="font-bold text-blue-600">{count}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    title="Increment"
                    icon={CirclePlus}
                    onClick={() => setCount(count + 1)}
                    variant="success"
                  />
                  <Button
                    title="Decrement"
                    onClick={() => setCount(count - 1)}
                    variant="danger"
                  />
                  <Button
                    title="Reset"
                    onClick={() => setCount(0)}
                    variant="secondary"
                  />
                </div>
              </div>
            </section>

            {/* States */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                States
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button title="Normal" />
                <Button title="Disabled" disabled />
                <Button
                  title="Disabled with Icon"
                  icon={Trash}
                  disabled
                  variant="danger"
                />
              </div>
            </section>

            {/* As Links */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                As Links
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  title="External Link"
                  link="https://google.com"
                  variant="primary"
                />
                <Button title="Learn More" link="#learn" variant="inline" />
                <Button
                  title="Home"
                  link="#home"
                  underline={true}
                  icon={HomeIcon}
                  variant="secondary"
                />
              </div>
            </section>

            {/* Full Width */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Full Width
              </h2>
              <Button
                title="Submit Form"
                variant="success"
                fullWidth
                type="submit"
                icon={CirclePlus}
              />
            </section>

            {/* Mixed Examples */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Real-World Example
              </h2>
              <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Ready to get started?
                </h3>
                <p className="mb-4 opacity-90">
                  Join thousands of satisfied users today.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button title="Sign Up Now" variant="success" size="lg" />
                  <Button
                    title="Learn more"
                    variant="inline"
                    className="text-white hover:text-gray-200"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
