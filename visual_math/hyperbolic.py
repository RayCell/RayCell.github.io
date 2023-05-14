from django.shortcuts import render
import math
import json

def hyperbolic(request):
    x_values = list(range(-10, 10))
    sinh_y_values = [math.sinh(x) for x in x_values]
    cosh_y_values = [math.cosh(x) for x in x_values]
    tanh_y_values = [math.tanh(x) for x in x_values]

    plot_data = [
        {
            'x': x_values,
            'y': sinh_y_values,
            'type': 'scatter',
            'name': 'sinh(x)'
        },
        {
            'x': x_values,
            'y': cosh_y_values,
            'type': 'scatter',
            'name': 'cosh(x)'
        },
        {
            'x': x_values,
            'y': tanh_y_values,
            'type': 'scatter',
            'name': 'tanh(x)'
        }
    ]

    plot_layout = {
        'title': 'Hyperbolic Functions',
        'xaxis': {'title': 'x'},
        'yaxis': {'title': 'y'}
    }

    plot_json = json.dumps({'data': plot_data, 'layout': plot_layout})

    context = {'plot_json': plot_json}
    return render(request, 'hyperbolic.html', context)
