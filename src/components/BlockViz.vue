<template>
  <div>
    <!-- SVG that renders the chart based on the "width" and "height" setting from the Vue instance’s data object -->
		<svg v-bind:width="settings.width" v-bind:height="settings.height">
      <!-- In contrast to D3’s "select" methods, we define the graphical elements explicitely here and use the template syntax to loop through collections and bind properties such as "d" or "r" to those elements. -->
      <transition-group tag="g" name="line">
        <!-- Links are represented as paths -->
        <path v-for="link in links" class="link" v-bind:key="link.id" v-bind:d="link.d" v-bind:style="link.style"></path>
			</transition-group>
      <!-- We can now also use events to elements that will call respective methods on the Vue instance -->       
      <transition-group tag="g" name="list">
        <g class="node" v-on:click="select(index, node)" v-for="(node, index) in nodes" v-bind:key="node.id" v-bind:style="node.style" v-bind:class="[node.className, {'highlight': node.highlight}]">
          <!-- Circles for each node -->
          <circle v-bind:r="node.r" v-bind:style="{'fill': index == selected ? '#ff0000' : '#bfbfbf'}"></circle>
          <!-- Finally, text labels -->
          <text v-bind:dx="node.textpos.x" v-bind:dy="node.textpos.y" v-bind:style="node.textStyle">{{ node.text }}</text>
        </g>
      </transition-group>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'BlockViz',
  data() {
    return {
      blocks: [],
      selected: null,
      search: "",
      settings: {
        strokeColor: "#19B5FF",
        width: 1200,
        height: 300
      }
    }
  },
  mounted() {
    this.blocks = this.$store.state.blocks
  },
  computed: {
    // once we have the CSV loaded, the "root" will be calculated
    root() {
      if (!this.blocks.length) return
      const stratify = d3.stratify().id(d => d.slot).parentId(d => d.parent)

      // attach the tree to the Vue data object
      return this.tree(stratify(this.blocks));
    },
    
    // the "tree" is also a computed property so that it is always up to date when the width and height settings change
    tree() {
      return d3
        .cluster()
        .size([this.settings.height, this.settings.width - 160]);
    },
    
    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum
    nodes() {
      if (!this.blocks.length) return
      return this.root.descendants().map((d) => {
        return {
          id: d.id,
          r: 5,
          className: "node" +
            (d.children ? " node--internal" : " node--leaf"),
          text: d.id,
          highlight: d.id.toLowerCase().indexOf(this.search.toLowerCase()) != -1 && this.search != "",
          style: {
            transform: "translate(" + d.y + "px," + d.x + "px)"
          },
          textpos: {
            // x: d.children ? -8 : 8,
            x: 0,
            y: -15
          },
          textStyle: {
            textAnchor: "middle"
            // textAnchor: d.children ? "end" : "start"
          }
        }
      })
    },
    
    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum
    links() {
      if (!this.blocks.length) return
      // here we’ll calculate the "d" attribute for each path that is then used in the template where we use "v-for" to loop through all of the links to create <path> elements
      return this.root.descendants().slice(1).map((d) => {
        return {
          id: d.id,
          d: "M" + d.y + "," + d.x + "C" + (d.parent.y + 100) + "," + d.x + " " + (d.parent.y + 100) + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x,
          
          // here we could of course calculate colors depending on data but for now all links share the same color from the settings object that we can manipulate using UI controls and v-model
          style: {
            stroke: this.settings.strokeColor
          }
        }
      })
    }
  },
  methods: {
    select(index/*, node*/) {
      this.selected = index;
    }
  }
}
</script>

<style scoped>

</style>
