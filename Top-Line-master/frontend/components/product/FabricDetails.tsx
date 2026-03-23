"use client";

type FabricDetailsProps = {
  description?: string;
  composition?: string;
  isAccessory?: boolean;
};

export default function FabricDetails({ description, composition, isAccessory }: FabricDetailsProps) {
  if (!description) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 bg-white py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">{isAccessory ? "Product Details" : "Fabric Details"}</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {description && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{isAccessory ? "About the Product" : "About the Fabric"}</h3>
              <p className="text-neutral-700 leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {composition && !isAccessory && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Composition</h3>
              <div className="bg-neutral-50 p-4 border border-neutral-200">
                <p className="text-neutral-900 font-medium">{composition}</p>
                <p className="text-xs text-neutral-600 mt-3">
                  ✓ Premium quality materials  
                  ✓ Eco-conscious sourcing  
                  ✓ Durability tested
                </p>
              </div>
            </div>
          )}
        </div>

        {!isAccessory && (
          <div className="mt-8 border-t border-neutral-200 pt-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Care Instructions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🧺</div>
                <p className="text-xs font-medium text-neutral-900">Cold Wash</p>
                <p className="text-xs text-neutral-600">30°C max</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👕</div>
                <p className="text-xs font-medium text-neutral-900">Gentle Cycle</p>
                <p className="text-xs text-neutral-600">Similar colors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚫</div>
                <p className="text-xs font-medium text-neutral-900">No Bleach</p>
                <p className="text-xs text-neutral-600">Ever</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌡️</div>
                <p className="text-xs font-medium text-neutral-900">Low Heat Dry</p>
                <p className="text-xs text-neutral-600">Or air dry</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
