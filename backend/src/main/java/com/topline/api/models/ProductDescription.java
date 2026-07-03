package com.topline.api.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Rich product description, mirroring the frontend ProductDescription shape.
 * Stored as a single jsonb column on Product.
 */
public class ProductDescription {
    private String story;
    private List<String> highlights = new ArrayList<>();
    private List<String> trustSignals = new ArrayList<>();
    private FabricBuild fabricBuild;
    private FitAndSizing fitAndSizing;
    private List<String> whyYouLoveIt = new ArrayList<>();
    private List<String> careInstructions = new ArrayList<>();

    public ProductDescription() {}

    public String getStory() { return story; }
    public void setStory(String story) { this.story = story; }

    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }

    public List<String> getTrustSignals() { return trustSignals; }
    public void setTrustSignals(List<String> trustSignals) { this.trustSignals = trustSignals; }

    public FabricBuild getFabricBuild() { return fabricBuild; }
    public void setFabricBuild(FabricBuild fabricBuild) { this.fabricBuild = fabricBuild; }

    public FitAndSizing getFitAndSizing() { return fitAndSizing; }
    public void setFitAndSizing(FitAndSizing fitAndSizing) { this.fitAndSizing = fitAndSizing; }

    public List<String> getWhyYouLoveIt() { return whyYouLoveIt; }
    public void setWhyYouLoveIt(List<String> whyYouLoveIt) { this.whyYouLoveIt = whyYouLoveIt; }

    public List<String> getCareInstructions() { return careInstructions; }
    public void setCareInstructions(List<String> careInstructions) { this.careInstructions = careInstructions; }

    public static class FabricBuild {
        private String description;
        private List<String> composition = new ArrayList<>();

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public List<String> getComposition() { return composition; }
        public void setComposition(List<String> composition) { this.composition = composition; }
    }

    public static class FitAndSizing {
        private String fit;
        private String model;
        private String sizing;

        public String getFit() { return fit; }
        public void setFit(String fit) { this.fit = fit; }

        public String getModel() { return model; }
        public void setModel(String model) { this.model = model; }

        public String getSizing() { return sizing; }
        public void setSizing(String sizing) { this.sizing = sizing; }
    }
}
